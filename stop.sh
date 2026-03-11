#!/bin/bash
set -e

echo "Stopping CDN Landings..."
docker compose down
echo "All services stopped."
