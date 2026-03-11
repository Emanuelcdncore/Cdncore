#!/bin/bash
set -e

echo "Starting CDN Landings..."
docker compose up -d --build
echo ""
echo "Services started:"
echo "  cdncore  -> http://cdncore.localhost"
echo "  cdntek   -> http://cdntek.localhost"
echo "  cdntv    -> http://cdntv.localhost"
echo ""
echo "Use './stop.sh' to stop all services."
