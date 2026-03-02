<#
Run this in PowerShell to:
 - verify Docker is running
 - start services from docker-compose.ci.yml
 - wait for MySQL, Redis, and backend to become healthy
 - run the Playwright smoke suite
 - optionally tear down services

Usage (from repo root):
  pwsh ./scripts/run-local-smoke.ps1
#>

set-StrictMode -Version Latest

function Abort($msg){ Write-Error $msg; exit 1 }

Write-Host "Checking Docker daemon..."
try {
  docker info > $null 2>&1
} catch {
  Abort "Docker daemon not available. Start Docker Desktop or Docker Engine and try again."
}

$composeFile = "docker-compose.ci.yml"
if (-not (Test-Path $composeFile)) { Abort "Cannot find $composeFile in repo root." }

Write-Host "Resetting existing services and volumes for a clean smoke run..."
docker compose -f $composeFile down -v --remove-orphans
if ($LASTEXITCODE -ne 0) { Write-Warning "docker compose down failed; proceeding to startup." }

Write-Host "Bringing up services from $composeFile..."
docker compose -f $composeFile up -d --build
if ($LASTEXITCODE -ne 0) { Abort "docker compose up failed." }

function Wait-ContainerHealthy($name, $timeoutSec=180) {
  Write-Host "Waiting for container '$name' to be healthy (timeout ${timeoutSec}s)..."
  $start = Get-Date
  while ((Get-Date) - $start -lt (New-TimeSpan -Seconds $timeoutSec)) {
    $status = docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' $name 2>$null
    if ($status -eq 'healthy') { Write-Host "$name is healthy."; return $true }
    if ($status -eq 'none') { Write-Host "$name has no healthcheck configured; checking running state..."; $running = docker inspect --format='{{.State.Running}}' $name 2>$null; if ($running -eq 'true') { return $true } }
    Start-Sleep -Seconds 3
  }
  return $false
}

$services = @('digibot-mysql-ci','digibot-redis-ci','digibot-backend-ci')
foreach ($s in $services) {
  if (-not (docker ps -a --format '{{.Names}}' | Select-String -Pattern "^$s$")) {
    Write-Host "Container $s not present yet; continuing (compose may use different names)."
  } else {
    if (-not (Wait-ContainerHealthy -name $s -timeoutSec 180)) { Write-Warning "Container $s did not become healthy in time." }
  }
}

Write-Host "Waiting for backend health endpoint http://localhost:5050/health..."
$apiUrl = 'http://127.0.0.1:5050/health'
$start = Get-Date
$timeout = 180
while ((Get-Date) - $start -lt (New-TimeSpan -Seconds $timeout)) {
  try {
    $r = Invoke-WebRequest -UseBasicParsing -Uri $apiUrl -TimeoutSec 5 -ErrorAction Stop
    if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 300) { Write-Host "Backend health OK."; break }
  } catch { Start-Sleep -Seconds 3 }
}

if (-not (Test-Path './e2e')) { Abort "Cannot find e2e folder." }

Write-Host "Running Playwright smoke suite..."
Push-Location e2e
try {
  npm run smoke
  $exit = $LASTEXITCODE
} finally {
  Pop-Location
}

Write-Host "Smoke run finished with exit code $exit"

Write-Host "Playwright report (if generated): ./e2e/playwright-report"

Write-Host "Done. To tear down services: docker compose -f $composeFile down"
exit $exit
