#!/usr/bin/env python3
"""
Script to fix lenient assertion patterns in smoke tests.

Problem: Tests use `if (![200, 201].includes(response.status())) return;`
         which skips validation on error responses, allowing bugs to pass undetected.

Solution: Replace lenient patterns with strict status code assertions using expect().
"""

import re
from pathlib import Path
from typing import List, Tuple

# Pattern to match lenient assertion lines
LENIENT_PATTERN = re.compile(
    r'^\s*if\s*\(!\[([0-9,\s]+)\]\.includes\(response\.status\(\)\)\)\s*return;\s*$',
    re.MULTILINE
)

def parse_expected_codes(codes_str: str) -> List[int]:
    """Parse comma-separated status codes from match."""
    return [int(code.strip()) for code in codes_str.split(',')]

def generate_strict_assertion(codes: List[int], indent: str = "\t\t\t") -> str:
    """Generate strict assertion based on expected status codes."""
    if len(codes) == 1:
        return f"{indent}expect(response.status()).toBe({codes[0]});"
    else:
        codes_str = ', '.join(map(str, sorted(codes)))
        return f"{indent}expect([{codes_str}]).toContain(response.status());"

def analyze_test_context(content: str, match_start: int) -> dict:
    """Analyze test context to determine appropriate assertion."""
    # Look backwards to find test description
    lines_before = content[:match_start].split('\n')
    
    context = {
        'is_success_test': False,
        'is_error_test': False,
        'error_type': None,
        'indent': '\t\t\t',
    }
    
    # Check last 10 lines for context
    for line in reversed(lines_before[-10:]):
        lower_line = line.lower()
        
        # Detect test type from describe blocks or test names
        if 'success' in lower_line or '200' in line or '201' in line:
            context['is_success_test'] = True
        
        if any(err in lower_line for err in ['unauthorized', '401', 'forbidden', '403', 
                                               'bad request', '400', 'not found', '404',
                                               'error', 'invalid', 'missing']):
            context['is_error_test'] = True
            
        # Extract indentation from the line with the lenient pattern
        if 'if (!' in line:
            indent_match = re.match(r'^(\s*)', line)
            if indent_match:
                context['indent'] = indent_match.group(1)
    
    return context

def should_skip_file(filepath: str) -> bool:
    """Determine if file should be skipped."""
    skip_patterns = [
        '_backup.spec.ts',
        '.bak',
        'node_modules',
    ]
    return any(pattern in filepath for pattern in skip_patterns)

def fix_lenient_assertions_in_file(filepath: Path) -> Tuple[int, int]:
    """
    Fix lenient assertions in a single file.
    
    Returns:
        Tuple of (number of lenient patterns found, number replaced)
    """
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        print(f"✗ Error reading {filepath}: {e}")
        return (0, 0)
    
    matches = list(LENIENT_PATTERN.finditer(content))
    
    if not matches:
        return (0, 0)
    
    # Process matches in reverse order to maintain correct positions
    new_content = content
    replacements = 0
    
    for match in reversed(matches):
        codes = parse_expected_codes(match.group(1))
        match_start = match.start()
        match_end = match.end()
        
        # Get indentation
        line_start = content.rfind('\n', 0, match_start) + 1
        indent = content[line_start:match_start]
        
        # Analyze context to determine if we should replace
        context = analyze_test_context(content, match_start)
        
        # Generate appropriate strict assertion
        strict_assertion = generate_strict_assertion(codes, indent)
        
        # Add comment explaining the fix for key scenarios
        if context['is_success_test'] and any(code >= 400 for code in codes):
            comment = f"{indent}// FIXED: Strict assertion - was lenient pattern allowing errors to pass\n"
            strict_assertion = comment + strict_assertion
        
        # Replace lenient pattern with strict assertion
        new_content = new_content[:match_start] + strict_assertion + new_content[match_end:]
        replacements += 1
    
    # Write back to file
    try:
        filepath.write_text(new_content, encoding='utf-8')
        return (len(matches), replacements)
    except Exception as e:
        print(f"✗ Error writing {filepath}: {e}")
        return (len(matches), 0)

def main():
    """Main execution function."""
    print("=" * 80)
    print("SMOKE TEST LENIENT ASSERTION FIXER")
    print("=" * 80)
    print()
    print("Fixing lenient assertions that allow bugs to pass undetected...")
    print()
    
    # Find all smoke test spec files
    specs_dir = Path(__file__).parent.parent / 'smoke-tests' / 'specs'
    
    if not specs_dir.exists():
        print(f"✗ Specs directory not found: {specs_dir}")
        return
    
    spec_files = list(specs_dir.glob('*.spec.ts'))
    
    if not spec_files:
        print(f"✗ No spec files found in {specs_dir}")
        return
    
    print(f"Found {len(spec_files)} test files")
    print()
    
    total_found = 0
    total_fixed = 0
    files_modified = 0
    
    for spec_file in sorted(spec_files):
        if should_skip_file(str(spec_file)):
            continue
        
        found, fixed = fix_lenient_assertions_in_file(spec_file)
        
        if found > 0:
            total_found += found
            total_fixed += fixed
            
            if fixed > 0:
                files_modified += 1
                status = "✓"
            else:
                status = "✗"
            
            print(f"{status} {spec_file.name}: {fixed}/{found} patterns fixed")
    
    print()
    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Files processed:  {len(spec_files)}")
    print(f"Files modified:   {files_modified}")
    print(f"Patterns found:   {total_found}")
    print(f"Patterns fixed:   {total_fixed}")
    print()
    
    if total_fixed > 0:
        print("✓ Successfully fixed lenient assertions!")
        print()
        print("Next steps:")
        print("  1. Review changes with: git diff")
        print("  2. Run tests to verify: npm run smoke")
        print("  3. Tests should now FAIL on error responses (this is correct behavior)")
    else:
        print("✓ No lenient assertions found or all already fixed!")

if __name__ == '__main__':
    main()
