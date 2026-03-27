#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Server Setup (one-time) ==="
echo "This installs Docker, swap, rsync, and prepares the app directory."
echo ""

cd "$SCRIPT_DIR/ansible"
ansible-playbook setup.yml
