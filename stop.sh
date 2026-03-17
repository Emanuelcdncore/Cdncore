#!/bin/bash
set -e

echo "Stopping CDN Landings..."
docker compose down -v
echo "All services stopped."
