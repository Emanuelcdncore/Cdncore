#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ANSIBLE_DIR="$SCRIPT_DIR/ansible"
PROJECT_DIR="$SCRIPT_DIR/.."
IMAGES_DIR="/tmp/cdn-landings-images"
PROJECT_NAME="cdn-landings"

SERVICES=(cdncore cdntek cdntv)

cmd_setup() {
    echo "=== Server Setup (one-time) ==="
    cd "$ANSIBLE_DIR"
    ansible-playbook setup.yml
}

cmd_build_local() {
    echo ""
    echo "=== Building images locally (one at a time) ==="
    mkdir -p "$IMAGES_DIR"

    for svc in "${SERVICES[@]}"; do
        echo ""
        echo "--- Building $svc ---"
        docker compose -p "$PROJECT_NAME" -f "$SCRIPT_DIR/docker-compose.prod.yml" --project-directory "$PROJECT_DIR" build "$svc"

        echo "--- Saving $svc image ---"
        docker save "${PROJECT_NAME}-${svc}" | gzip > "$IMAGES_DIR/${svc}.tar.gz"
        echo "    -> $IMAGES_DIR/${svc}.tar.gz ($(du -h "$IMAGES_DIR/${svc}.tar.gz" | cut -f1))"
    done

    echo ""
    echo "=== All images built and saved ==="
}

cmd_deploy_local() {
    cmd_build_local

    echo ""
    echo "=== Deploying with local images ==="
    cd "$ANSIBLE_DIR"
    ansible-playbook deploy.yml -e "build_mode=local" -e "images_dir=$IMAGES_DIR"
}

cmd_deploy_remote() {
    echo ""
    echo "=== Deploying with remote build ==="
    cd "$ANSIBLE_DIR"
    ansible-playbook deploy.yml -e "build_mode=remote"
}

cmd_deploy() {
    echo ""
    echo "Where should Docker images be built?"
    echo ""
    echo "  1) Build on PRODUCTION server"
    echo "     (slower deploy, uses prod CPU/RAM)"
    echo ""
    echo "  2) Build LOCALLY and send images"
    echo "     (faster deploy, uses local CPU/RAM)"
    echo ""
    read -rp "Choose [1/2]: " choice

    case "$choice" in
        2) cmd_deploy_local ;;
        *) cmd_deploy_remote ;;
    esac
}

cmd_all() {
    cmd_setup
    cmd_deploy
}

case "${1:-}" in
    setup)  cmd_setup  ;;
    deploy) cmd_deploy ;;
    local)  cmd_deploy_local ;;
    remote) cmd_deploy_remote ;;
    all)    cmd_all    ;;
    *)
        echo "Usage: $0 {setup|deploy|local|remote|all}"
        echo ""
        echo "  setup   - One-time server setup (Docker, swap, etc.)"
        echo "  deploy  - Interactive: choose local or remote build"
        echo "  local   - Build locally, deploy images to prod"
        echo "  remote  - Build on prod server"
        echo "  all     - Setup + deploy"
        ;;
esac
