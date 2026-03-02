import os
import re

def check_balance_lines(lines, start_line):
    stack = []
    errors = []
    
    for i, line in enumerate(lines):
        line_num = start_line + i
        clean_line = re.sub(r'".*?"', '""', line)
        clean_line = re.sub(r"'.*?'", "''", clean_line)
        clean_line = re.sub(r"`.*?`", "``", clean_line)
        clean_line = re.sub(r"//.*", "", clean_line)
        
        for char in clean_line:
            if char in "{(":
                stack.append((char, line_num))
            elif char in "})":
                if not stack:
                    return [f"Line {line_num}: Unexpected closing '{char}'"]
                else:
                    last_char, last_line = stack.pop()
                    expected = '}' if last_char == '{' else ')'
                    if char != expected:
                        return [f"Line {line_num}: Mismatched '{char}' (expected '{expected}')"]
    
    if stack:
        return [f"Unclosed '{stack[0][0]}' from line {stack[0][1]}"]
    return []

def main():
    import sys
    
    # Accept target file as arg, otherwise default to a robust relative path resolving from the script location
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
    else:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(script_dir, "..", "e2e", "tests", "smoke", "auth_register_comprehensive.spec.ts")
        
    if not os.path.exists(file_path):
        print(f"Error: Target file not found at {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        all_lines = f.readlines()

    blocks = [
        ("201 Success", 26, 148),
        ("400 Bad Request", 154, 284),
        ("401 Unauthorized", 290, 316),
        ("409 Conflict", 321, 361),
        ("422 Validation", 366, 459),
        ("405 Method Not Allowed", 465, 526),
        ("429 Rate Limit", 532, 580),
        ("500 Server Error", 586, 612),
        ("Edge Cases", 618, 704),
        ("Response Format", 710, 808)
    ]

    report_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "block_report.txt")
    output = []
    output.append(f"Checking {len(blocks)} blocks in {file_path}...")
    
    for name, start, end in blocks:
        # adjust to 0-indexed, inclusive end
        chunk = all_lines[start-1:end]
        errors = check_balance_lines(chunk, start)
        if errors:
            output.append(f"❌ {name} ({start}-{end}): {errors}")
        else:
            output.append(f"✅ {name} ({start}-{end})")
            
    with open(report_path, "w", encoding="utf-8") as f:
        f.write("\n".join(output))
    print("Report generated.")

if __name__ == "__main__":
    main()
