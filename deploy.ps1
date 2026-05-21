<#
.SYNOPSIS
    CDN Landings - Production Deployment Script (PowerShell)

.DESCRIPTION
    Builds Docker images locally, transfers them to the production server,
    and performs a rolling deploy. Mirrors the Forgejo CI/CD pipeline.

.PARAMETER DeployHost
    Production server IP or hostname. Defaults to env:DEPLOY_HOST.

.PARAMETER DeployUser
    SSH user for the production server. Defaults to env:DEPLOY_USER.

.PARAMETER SshKeyPath
    Path to the SSH private key. Defaults to env:DEPLOY_SSH_KEY_PATH.

.PARAMETER Apps
    Specific apps to deploy (e.g. -Apps cdncore,cdntek). Auto-detects from git diff if omitted.

.PARAMETER DeployAll
    Force deploy all apps regardless of git changes.

.PARAMETER SkipBuild
    Skip local Docker build (use already-built images).

.PARAMETER SkipMigrate
    Skip database migrations.

.PARAMETER SyncOnly
    Only sync config files, do not build or deploy images.

.EXAMPLE
    .\deploy.ps1 -DeployHost 192.168.30.47 -DeployUser it -SshKeyPath C:\Users\me\.ssh\id_rsa

.EXAMPLE
    .\deploy.ps1 -DeployAll -SkipMigrate

.EXAMPLE
    .\deploy.ps1 -Apps cdncore,cdntv
#>

[CmdletBinding()]
param(
    [string]$DeployHost  = $env:DEPLOY_HOST,
    [string]$DeployUser  = $env:DEPLOY_USER,
    [string]$SshKeyPath  = $env:DEPLOY_SSH_KEY_PATH,
    [string[]]$Apps      = @(),
    [switch]$DeployAll,
    [switch]$SkipBuild,
    [switch]$SkipMigrate,
    [switch]$SyncOnly,
    [switch]$Help
)

# ─── Constants ───────────────────────────────────────────────────────────────
$PROJECT_NAME = "cdn-landings"
$APP_DIR      = "/opt/cdn-landings"
$ALL_APPS     = @("cdncore", "cdntek", "cdntv", "cdnglobal", "aiaccountant", "loritalk")
$SCRIPT_DIR   = Split-Path -Parent $MyInvocation.MyCommand.Path

# ─── Colors ──────────────────────────────────────────────────────────────────
function Write-Step  { param([string]$Msg) Write-Host "`n=== $Msg ===" -ForegroundColor Cyan }
function Write-Ok    { param([string]$Msg) Write-Host "  OK: $Msg" -ForegroundColor Green }
function Write-Warn  { param([string]$Msg) Write-Host "  WARN: $Msg" -ForegroundColor Yellow }
function Write-Err   { param([string]$Msg) Write-Host "  ERROR: $Msg" -ForegroundColor Red }
function Write-Info  { param([string]$Msg) Write-Host "  $Msg" -ForegroundColor Gray }

# ─── SSH / SCP helpers ───────────────────────────────────────────────────────
$sshBase = @("-o", "StrictHostKeyChecking=no")
if ($SshKeyPath) { $sshBase += @("-i", $SshKeyPath) }

function Ssh-Prod {
    param([Parameter(Mandatory)][string]$Command)
    $args = $sshBase + @("$DeployUser@$DeployHost", $Command)
    & ssh @args
}

function Scp-ToProd {
    param([Parameter(Mandatory)][string]$Local, [Parameter(Mandatory)][string]$Remote)
    $args = $sshBase + @($Local, "${DeployUser}@${DeployHost}:${Remote}")
    & scp @args
}

# ─── Help ────────────────────────────────────────────────────────────────────
if ($Help) {
    Get-Help $MyInvocation.MyCommand.Path -Detailed
    exit 0
}

# ─── Banner ──────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "  CDN Landings - Production Deploy" -ForegroundColor Magenta
Write-Host "  --------------------------------" -ForegroundColor DarkGray
Write-Host ""

# ─── Validate parameters ────────────────────────────────────────────────────
if (-not $DeployHost)  { Write-Err "Missing -DeployHost (or set DEPLOY_HOST env var)."; exit 1 }
if (-not $DeployUser)  { Write-Err "Missing -DeployUser (or set DEPLOY_USER env var)."; exit 1 }
if (-not $SshKeyPath)  { Write-Err "Missing -SshKeyPath (or set DEPLOY_SSH_KEY_PATH env var)."; exit 1 }
if (-not (Test-Path $SshKeyPath)) { Write-Err "SSH key not found: $SshKeyPath"; exit 1 }

Write-Info "Host:   $DeployHost"
Write-Info "User:   $DeployUser"
Write-Info "Key:    $SshKeyPath"

# ─── Verify SSH connection ──────────────────────────────────────────────────
Write-Step "Verify SSH connection"
$result = Ssh-Prod "echo SSH_OK" 2>&1
if ($result -notmatch "SSH_OK") {
    Write-Err "Cannot connect to $DeployUser@$DeployHost"
    exit 1
}
Write-Ok "SSH connection verified"

# ─── Detect changed apps ────────────────────────────────────────────────────
$InfraChanged = $false

if ($DeployAll -or $SyncOnly) {
    $Apps = $ALL_APPS
    $InfraChanged = $true
    Write-Info "Mode: deploy all apps"
}
elseif ($Apps.Count -gt 0) {
    Write-Info "Mode: deploy specified apps ($($Apps -join ', '))"
}
else {
    Write-Step "Detect changed apps"
    $changedFiles = @()
    try {
        $changedFiles = @(git diff --name-only HEAD~1 HEAD 2>$null)
    }
    catch { }

    if ($changedFiles.Count -eq 0) {
        Write-Warn "No diff available, deploying all apps"
        $Apps = $ALL_APPS
        $InfraChanged = $true
    }
    else {
        $detectedApps = @()
        foreach ($app in $ALL_APPS) {
            $prefix = "apps/${app}/"
            foreach ($f in $changedFiles) {
                if ($f.StartsWith($prefix)) { $detectedApps += $app; break }
            }
        }

        $sharedChanged = $false
        foreach ($f in $changedFiles) {
            if ($f.StartsWith("packages/")) { $sharedChanged = $true; break }
        }
        if ($sharedChanged) {
            Write-Info "Shared packages changed, deploying all apps"
            $detectedApps = $ALL_APPS
        }

        foreach ($f in $changedFiles) {
            if ($f -match "^(deploy/|nginx/|docker-compose|database/|\.forgejo/)") {
                $InfraChanged = $true; break
            }
        }

        $Apps = @($detectedApps | Select-Object -Unique)

        if ($Apps.Count -eq 0) {
            Write-Warn "No app changes detected. Only syncing configs."
        }
        else {
            Write-Info "Changed apps: $($Apps -join ', ')"
            Write-Info "Infra changed: $InfraChanged"
        }
    }
}

if ($Apps.Count -eq 0 -and -not $SyncOnly) {
    Write-Warn "Nothing to deploy."
    exit 0
}

# ─── Build Docker images ────────────────────────────────────────────────────
if (-not $SkipBuild -and -not $SyncOnly -and $Apps.Count -gt 0) {
    Write-Step "Build Docker images"
    foreach ($app in $Apps) {
        Write-Info "Building $app ..."
        & docker compose -p $PROJECT_NAME `
            -f "$SCRIPT_DIR\deploy\docker-compose.prod.yml" `
            --project-directory $SCRIPT_DIR `
            build $app
        if ($LASTEXITCODE -ne 0) {
            Write-Err "Build failed for $app"
            exit 1
        }
        Write-Ok "$app built"
    }
}

# ─── Save and transfer images ───────────────────────────────────────────────
$tempDir = Join-Path $env:TEMP "cdn-images-$(Get-Random)"
if (-not $SyncOnly -and $Apps.Count -gt 0) {
    Write-Step "Save and transfer Docker images"
    New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

    foreach ($svc in $Apps) {
        $imageTag = "${PROJECT_NAME}-${svc}"
        $archive  = Join-Path $tempDir "${svc}.tar.gz"

        Write-Info "Saving $svc ..."
        & docker save $imageTag | gzip > $archive
        if ($LASTEXITCODE -ne 0) {
            Write-Err "docker save failed for $svc"
            exit 1
        }

        $size = (Get-Item $archive).Length / 1MB
        Write-Info "Archive: $([math]::Round($size, 1)) MB"

        Write-Info "Transferring $svc ..."
        Scp-ToProd $archive "/tmp/${svc}.tar.gz"
        if ($LASTEXITCODE -ne 0) {
            Write-Err "SCP failed for $svc"
            exit 1
        }
        Write-Ok "$svc transferred"
    }
}

# ─── Sync config files ──────────────────────────────────────────────────────
Write-Step "Sync config files to production"
$configArchive = Join-Path $env:TEMP "cdn-configs-$(Get-Random).tar.gz"

Push-Location $SCRIPT_DIR
try {
    & tar -czf $configArchive deploy database
    if ($LASTEXITCODE -ne 0) {
        Write-Err "Failed to create config archive"
        exit 1
    }

    Scp-ToProd $configArchive "/tmp/cdn-configs.tar.gz"
    if ($LASTEXITCODE -ne 0) {
        Write-Err "Failed to transfer config archive"
        exit 1
    }

    Ssh-Prod "cd $APP_DIR && tar -xzf /tmp/cdn-configs.tar.gz && rm -f /tmp/cdn-configs.tar.gz"
    if ($LASTEXITCODE -ne 0) {
        Write-Err "Failed to extract config archive on server"
        exit 1
    }
    Write-Ok "Config files synced"
}
finally {
    Pop-Location
    Remove-Item $configArchive -Force -ErrorAction SilentlyContinue
}

# ─── Prepare production compose file ────────────────────────────────────────
Write-Step "Prepare production docker-compose"
Ssh-Prod "cp ${APP_DIR}/deploy/docker-compose.prod.yml ${APP_DIR}/docker-compose.yml"
if ($LASTEXITCODE -ne 0) { Write-Err "Failed to copy docker-compose.yml"; exit 1 }
Write-Ok "docker-compose.yml ready"

# ─── Load Docker images on production ───────────────────────────────────────
if (-not $SyncOnly -and $Apps.Count -gt 0) {
    Write-Step "Load Docker images on production"
    foreach ($svc in $Apps) {
        Write-Info "Loading $svc ..."
        Ssh-Prod "gunzip -c /tmp/${svc}.tar.gz | docker load"
        if ($LASTEXITCODE -ne 0) {
            Write-Err "Failed to load image $svc"
            exit 1
        }
        Ssh-Prod "rm -f /tmp/${svc}.tar.gz"
        Write-Ok "$svc loaded"
    }
}

# ─── Database: PostgreSQL + migrations ──────────────────────────────────────
if (-not $SkipMigrate) {
    Write-Step "Start PostgreSQL and run migrations"
    Ssh-Prod "cd ${APP_DIR} && docker compose up -d postgres"
    if ($LASTEXITCODE -ne 0) { Write-Err "Failed to start PostgreSQL"; exit 1 }

    Write-Info "Waiting for PostgreSQL ..."
    $ready = $false
    for ($i = 1; $i -le 30; $i++) {
        $r = Ssh-Prod "cd ${APP_DIR} && docker compose exec -T postgres pg_isready -U postgres -d cdnlandings" 2>&1
        if ($r -match "accepting connections") {
            $ready = $true
            Write-Ok "PostgreSQL is ready"
            break
        }
        Write-Info "  Attempt $i/30 ..."
        Start-Sleep -Seconds 2
    }
    if (-not $ready) {
        Write-Err "PostgreSQL did not become ready in time"
        exit 1
    }

    Write-Info "Running migrations ..."
    Ssh-Prod "cd ${APP_DIR} && docker compose --profile migration up migrate"
    if ($LASTEXITCODE -ne 0) {
        Write-Warn "Migrations may have issues (exit code $LASTEXITCODE)"
    }
    else {
        Write-Ok "Migrations complete"
    }
}

# ─── Rolling deploy ─────────────────────────────────────────────────────────
if (-not $SyncOnly -and $Apps.Count -gt 0) {
    Write-Step "Rolling deploy"
    foreach ($app in $Apps) {
        Write-Info "Deploying $app ..."
        Ssh-Prod "cd ${APP_DIR} && docker compose up -d --no-deps --force-recreate ${app}"
        if ($LASTEXITCODE -ne 0) {
            Write-Err "Failed to deploy $app"
            exit 1
        }

        Write-Info "Waiting for $app health ..."
        $healthy = $false
        for ($i = 1; $i -le 30; $i++) {
            $r = Ssh-Prod "cd ${APP_DIR} && docker compose exec -T ${app} wget -q --spider http://127.0.0.1:3000/" 2>&1
            if ($LASTEXITCODE -eq 0) {
                $healthy = $true
                Write-Ok "$app is healthy"
                break
            }
            Write-Info "  Attempt $i/30 ..."
            Start-Sleep -Seconds 3
        }
        if (-not $healthy) {
            Write-Warn "$app did not report healthy within timeout"
        }
    }
}

# ─── Nginx reload ────────────────────────────────────────────────────────────
if ($InfraChanged -or $Apps.Count -gt 0) {
    Write-Step "Reload Nginx"
    Ssh-Prod "cd ${APP_DIR} && docker compose up -d --no-deps nginx"
    Ssh-Prod "cd ${APP_DIR} && docker compose exec -T nginx nginx -s reload"
    if ($LASTEXITCODE -eq 0) {
        Write-Ok "Nginx reloaded"
    }
    else {
        Write-Warn "Nginx reload returned non-zero exit code"
    }
}

# ─── Cleanup ─────────────────────────────────────────────────────────────────
Write-Step "Cleanup"
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue }
Ssh-Prod "docker image prune -f" | Out-Null

# ─── Done ────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "=== Deployment Complete ===" -ForegroundColor Green
Write-Info "Apps deployed: $($Apps -join ', ')"
Write-Info "Infra changed: $InfraChanged"
Write-Host ""
