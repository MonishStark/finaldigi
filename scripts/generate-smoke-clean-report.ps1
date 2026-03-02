$logPath = Join-Path (Get-Location) "smoke-run-20260301_235720.log"
$reportPath = Join-Path (Get-Location) "SMOKE_TEST_CLEAN_REPORT_20260302.md"

$raw = Get-Content $logPath
$lines = $raw | ForEach-Object { ($_ -replace "\x1B\[[0-9;]*[A-Za-z]", "") -replace "[\u0000-\u001F]", "" }

$didNotRunLine = Select-String -Path $logPath -Pattern "^\s+(\d+)\s+did not run" | Select-Object -Last 1
$passedLine = Select-String -Path $logPath -Pattern "^\s+(\d+)\s+passed" | Select-Object -Last 1
$totalFromProgress = Select-String -Path $logPath -Pattern "\[\d+/(\d+)\]" | Select-Object -Last 1

$didNotRun = if ($didNotRunLine) { [int]$didNotRunLine.Matches[0].Groups[1].Value } else { 0 }
$passed = if ($passedLine) { [int]$passedLine.Matches[0].Groups[1].Value } else { 0 }
$total = if ($totalFromProgress) { [int]$totalFromProgress.Matches[0].Groups[1].Value } else { 0 }
$failed = $total - $passed - $didNotRun

$failedEntries = New-Object System.Collections.Generic.List[object]
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ($line -match "^\s*(\d+)\)\s+\[chromium\]\s+(.*smoke-tests\\specs\\.*)$") {
        $idx = [int]$matches[1]
        $testName = ($matches[2] -replace "\s+", " ").Trim()

        $message = ""
        $expected = ""
        $received = ""
        $reasonType = "Assertion/Error"

        $windowEnd = [Math]::Min($i + 55, $lines.Count - 1)
        for ($j = $i + 1; $j -le $windowEnd; $j++) {
            $ln = $lines[$j].Trim()
            if ($ln -match "^\d+\)\s+\[chromium\]") { break }
            if (-not $message -and $ln -match "^SyntaxError:") { $reasonType = "SyntaxError"; $message = $ln }
            if (-not $message -and $ln -match "^Error:\s*(.*)$") { $message = $matches[1].Trim() }
            if (-not $expected -and $ln -match "^Expected:\s*(.*)$") { $expected = $matches[1].Trim() }
            if (-not $received -and $ln -match "^Received:\s*(.*)$") { $received = $matches[1].Trim() }
        }

        if (-not $message) { $message = "See assertion details in smoke log" }
        $reason = if ($expected -or $received) {
            "$message; Expected: $expected; Received: $received"
        } else {
            $message
        }

        $failedEntries.Add([pscustomobject]@{
            Index = $idx
            Test = $testName
            ReasonType = $reasonType
            Reason = $reason
        })
    }
}
$failedEntries = $failedEntries | Sort-Object Index -Unique

$reasonBuckets = $failedEntries | Group-Object {
    if ($_.Reason -match "Expected:.*Received:") { "Expected vs actual mismatch" }
    elseif ($_.Reason -match "SyntaxError") { "JSON/response parsing error" }
    elseif ($_.Reason -match "toContain|toBeDefined|toEqual") { "Response content/shape assertion" }
    else { "Other assertion error" }
} | Sort-Object Count -Descending

$skipDeclCount = (Get-ChildItem "e2e\smoke-tests\specs" -Recurse -Filter "*.ts" | Select-String -Pattern "test\.skip\(|describe\.skip\(|test\.fixme\(" | Measure-Object).Count

$md = New-Object System.Collections.Generic.List[string]
$md.Add("# Smoke Test Clean Failure Report")
$md.Add("")
$md.Add("Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$md.Add("")
$md.Add("## Run Summary")
$md.Add("")
$md.Add("- Total discovered tests: **$total**")
$md.Add("- Passed: **$passed**")
$md.Add("- Failed: **$failed**")
$md.Add("- Did not run: **$didNotRun**")
$md.Add("")
$md.Add("## Failure Pattern Summary")
$md.Add("")
foreach ($bucket in $reasonBuckets) {
    $md.Add("- **$($bucket.Name):** $($bucket.Count)")
}
$md.Add("")
$md.Add("## Failed Testcases and Reasons")
$md.Add("")
$md.Add("| # | Testcase | Failure Reason |")
$md.Add("|---:|---|---|")
foreach ($f in $failedEntries) {
    $t = ($f.Test -replace "\|","/")
    $r = ($f.Reason -replace "\|","/" -replace "\r|\n"," ")
    $md.Add("| $($f.Index) | $t | $r |")
}
$md.Add("")
$md.Add("## Skipped / Did Not Run")
$md.Add("")
$md.Add("- Playwright reported **$didNotRun** tests as **did not run**.")
$md.Add("- Explicit skipped declarations in suite (`test.skip` / `describe.skip` / `test.fixme`): **$skipDeclCount**")
$md.Add("- Individual names for 'did not run' tests are not printed by this reporter output.")
$md.Add("")
$md.Add("## Why They Failed (Root Causes)")
$md.Add("")
$md.Add("- Assertion mismatch between expected and actual HTTP status/message.")
$md.Add("- In some endpoints, response body format differs from spec assertions.")
$md.Add("- Repeated login warnings (`Invalid password`) indicate credential/state drift, which can cascade into auth-dependent tests.")
$md.Add("")
$md.Add("Source log: `$logPath`")

Set-Content -Path $reportPath -Value $md -Encoding UTF8
Write-Host "REPORT_FILE=$([System.IO.Path]::GetFileName($reportPath))"
Write-Host "FAILED_ROWS=$($failedEntries.Count)"
Write-Host "SKIP_DECLARATIONS=$skipDeclCount"
