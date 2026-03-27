# How to Setup Forgejo CI/CD and Deploy Machine

Complete guide to configure the Forgejo Actions CI/CD pipeline and the production server for automated deployments.

## Overview

```
Developer pushes to main
  → Forgejo Actions runner builds Docker images
  → Images are transferred to the production server via SCP
  → Rolling deploy with health checks
```

**Machines involved:**

| Machine | Role | Requirements |
|---------|------|-------------|
| Forgejo server | Hosts the git repo + Actions | Forgejo instance with Actions enabled |
| Runner machine | Builds Docker images | Docker, rsync, ssh, disk space (~10GB) |
| Production server | Runs the apps | Docker, Docker Compose |

The runner can be the same machine as the Forgejo server, or a separate build machine.

---

## Part 1: Production Server Setup

### 1.1 Initial setup with Ansible (one-time)

The Ansible playbook installs Docker, configures swap, and prepares the app directory.

```bash
./deploy/deploy.sh setup
```

This runs `deploy/ansible/setup.yml` which:
- Installs essential packages (curl, rsync, htop, etc.)
- Creates 2GB swap file (swappiness=10)
- Installs Docker CE + Docker Compose plugin
- Configures Docker log rotation (10MB max, 3 files)
- Creates `/opt/cdn-landings` owned by the deploy user
- Sets up weekly Docker prune cron job

### 1.2 Verify Docker is working

```bash
ssh it@192.168.30.110 "docker compose version"
```

---

## Part 2: Forgejo Actions Runner Setup

### 2.1 Enable Actions on the Forgejo instance

In Forgejo admin settings, ensure Actions is enabled:
- Go to **Site Administration > Configuration > Actions**
- Enable Actions if not already active

### 2.2 Install the runner

On the machine that will run CI builds:

```bash
# Download act_runner (check Forgejo releases for latest version)
wget https://code.forgejo.org/forgejo/runner/releases/download/v6.3.1/forgejo-runner-6.3.1-linux-amd64
chmod +x forgejo-runner-6.3.1-linux-amd64
sudo mv forgejo-runner-6.3.1-linux-amd64 /usr/local/bin/forgejo-runner
```

### 2.3 Register the runner

Get a registration token from Forgejo:
- Go to **Repository Settings > Actions > Runners**
- Click **Create new runner** and copy the token

```bash
forgejo-runner register \
  --instance https://<your-forgejo-url> \
  --token <REGISTRATION_TOKEN> \
  --name cdn-landings-runner \
  --labels self-hosted
```

### 2.4 Runner requirements

The runner machine needs:

```bash
# Docker (for building images)
docker --version

# rsync (for syncing files to production)
rsync --version

# SSH client (for connecting to production)
ssh -V
```

If any are missing:
```bash
sudo apt install -y docker.io rsync openssh-client
sudo usermod -aG docker $(whoami)
```

### 2.5 Start the runner

```bash
# Run in foreground (for testing)
forgejo-runner daemon

# Or set up as a systemd service (recommended)
sudo tee /etc/systemd/system/forgejo-runner.service > /dev/null <<EOF
[Unit]
Description=Forgejo Actions Runner
After=network.target

[Service]
Type=simple
User=$(whoami)
WorkingDirectory=$(pwd)
ExecStart=/usr/local/bin/forgejo-runner daemon
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now forgejo-runner
```

### 2.6 Verify the runner

In Forgejo, go to **Repository Settings > Actions > Runners**. The runner should appear as **online** with the `self-hosted` label.

---

## Part 3: SSH Deploy Key

The CI pipeline needs SSH access to the production server.

### 3.1 Generate a deploy key

On any machine (your local machine is fine):

```bash
ssh-keygen -t ed25519 -C "forgejo-ci" -f forgejo_deploy_key -N ""
```

This creates two files:
- `forgejo_deploy_key` — private key (goes into Forgejo secret)
- `forgejo_deploy_key.pub` — public key (goes on the production server)

### 3.2 Add the public key to the production server

```bash
ssh-copy-id -i forgejo_deploy_key.pub it@192.168.30.110
```

Or manually:
```bash
cat forgejo_deploy_key.pub | ssh it@192.168.30.110 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### 3.3 Test the connection

```bash
ssh -i forgejo_deploy_key it@192.168.30.110 "echo 'SSH OK'"
```

### 3.4 Save the private key content

```bash
cat forgejo_deploy_key
```

Copy the full output (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`). You will paste this into the Forgejo secret in the next step.

### 3.5 Clean up local keys

After configuring the secrets (next step), delete the keys from your machine:

```bash
rm forgejo_deploy_key forgejo_deploy_key.pub
```

---

## Part 4: Forgejo Repository Secrets

Go to **Repository Settings > Actions > Secrets** and create these 3 secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `DEPLOY_SSH_KEY` | Content of `forgejo_deploy_key` (the private key) | SSH authentication to production server |
| `DEPLOY_HOST` | `192.168.30.110` | Production server IP address |
| `DEPLOY_USER` | `it` | SSH username on production server |

---

## Part 5: Verify the Pipeline

### 5.1 Trigger a deploy

Push any change to `main`:

```bash
git commit --allow-empty -m "Test CI/CD pipeline"
git push
```

### 5.2 Monitor the workflow

Go to the **Actions** tab in Forgejo. You should see the "Deploy to Production" workflow running with these steps:

1. Checkout repository
2. Setup SSH key
3. Verify SSH connection
4. Build cdncore / cdntek / cdntv (one by one)
5. Save and transfer images
6. Sync project files to production
7. Prepare production configs
8. Load Docker images
9. Start postgres and run migrations
10. Rolling deploy: cdncore → cdntek → cdntv (with health checks)
11. Reload nginx
12. Cleanup

### 5.3 Verify the apps

After the workflow completes, check that all apps respond:

```bash
curl -o /dev/null -w "%{http_code}" http://192.168.30.110/cdncore
curl -o /dev/null -w "%{http_code}" http://192.168.30.110/cdntek
curl -o /dev/null -w "%{http_code}" http://192.168.30.110/cdntv
```

All should return `200`, `301`, or `302`.

---

## Troubleshooting

### Runner not picking up jobs
- Check runner status: `sudo systemctl status forgejo-runner`
- Verify the runner appears as online in Forgejo repository settings
- Check that `runs-on: self-hosted` in the workflow matches the runner label

### SSH connection fails in CI
- Verify the `DEPLOY_SSH_KEY` secret contains the full private key (including headers)
- Test manually: `ssh -i <key> it@192.168.30.110`
- Check that the public key is in `/home/it/.ssh/authorized_keys` on the server

### Docker build fails on runner
- Ensure the runner user is in the `docker` group: `groups $(whoami)`
- Check disk space: `df -h` (need ~10GB free for builds)
- Check Docker is running: `docker info`

### Health check fails after deploy
- Check app logs: `ssh it@192.168.30.110 "cd /opt/cdn-landings && docker compose logs cdncore"`
- Verify the app is running: `ssh it@192.168.30.110 "cd /opt/cdn-landings && docker compose ps"`
- Test directly: `ssh it@192.168.30.110 "curl -s http://127.0.0.1:3001/cdncore"`

### Images fail to transfer
- Check disk space on production: `ssh it@192.168.30.110 "df -h /tmp"`
- Check network connectivity between runner and production server

---

## Summary

| Step | What | Where |
|------|------|-------|
| 1 | Setup production server | `./deploy/deploy.sh setup` |
| 2 | Install + register Forgejo runner | Runner machine |
| 3 | Generate SSH deploy key | Any machine |
| 4 | Add public key to production | `192.168.30.110:/home/it/.ssh/authorized_keys` |
| 5 | Configure 3 secrets in Forgejo | Repository Settings > Actions > Secrets |
| 6 | Push to main and verify | Forgejo Actions tab |
