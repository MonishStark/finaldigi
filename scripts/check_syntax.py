import os
import re

def check_balance(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
    except Exception as e:
        return [f"Could not read file: {e}"]
    
    stack = []
    errors = []
    
    for i, line in enumerate(lines):
        line_num = i + 1
        # Remove strings and comments to avoid false positives
        # Simple regex for strings (this is imperfect but helps)
        clean_line = re.sub(r'".*?"', '""', line)
        clean_line = re.sub(r"'.*?'", "''", clean_line)
        clean_line = re.sub(r"`.*?`", "``", clean_line)
        clean_line = re.sub(r"//.*", "", clean_line)
        
        for char in clean_line:
            if char in "{(":
                stack.append((char, line_num))
            elif char in "})":
                if not stack:
                    errors.append(f"Line {line_num}: Unexpected closing '{char}'")
                else:
                    last_char, last_line = stack.pop()
                    expected = '}' if last_char == '{' else ')'
                    if char != expected:
                        errors.append(f"Line {line_num}: Mismatched '{char}' (expected '{expected}' for '{last_char}' from line {last_line})")
    
    if stack:
        first_unclosed, line = stack[0]
        errors.append(f"Unclosed '{first_unclosed}' from line {line}")
        
    return errors

def main():
    import sys
    
    if len(sys.argv) > 1:
        target_dir = sys.argv[1]
    else:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        target_dir = os.path.join(script_dir, "..", "e2e", "tests", "smoke")
        
    if not os.path.exists(target_dir):
        print(f"Error: Target directory not found at {target_dir}")
        return
        
    report_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "syntax_report.txt")
    
    output = []
    output.append(f"Scanning {target_dir}...")
    
    issues_found = False
    for filename in os.listdir(target_dir):
        if filename.endswith(".spec.ts") or filename.endswith(".ts"):
            file_path = os.path.join(target_dir, filename)
            errors = check_balance(file_path)
            if errors:
                issues_found = True
                output.append(f"\n❌ {filename}:")
                for err in errors:
                    output.append(f"  - {err}")
    
    if not issues_found:
        output.append("\n✅ No brace/parenthesis balance errors found.")
        
    with open(report_path, "w", encoding="utf-8") as f:
        f.write("\n".join(output))
    
    print("Report generated.")

if __name__ == "__main__":
    main()
