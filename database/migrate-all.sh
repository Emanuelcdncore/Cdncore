#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Running all database migrations ==="

for db_dir in "$SCRIPT_DIR"/*/; do
    [ -f "$db_dir/migrate.sh" ] || continue

    db_name=$(basename "$db_dir")
    var_name="DATABASE_URL_$(echo "$db_name" | tr '[:lower:]' '[:upper:]')"
    db_url="${!var_name}"

    if [ -z "$db_url" ]; then
        echo "WARNING: $var_name not set, skipping $db_name"
        continue
    fi

    echo ""
    echo "--- $db_name ---"
    DATABASE_URL="$db_url" bash "$db_dir/migrate.sh"
done

echo ""
echo "=== All migrations complete ==="
