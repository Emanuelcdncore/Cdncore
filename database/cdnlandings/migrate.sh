#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DB_NAME="$(basename "$SCRIPT_DIR")"
DB_URL="${DATABASE_URL:?DATABASE_URL is required}"

echo "Running migrations for $DB_NAME..."

# Create migrations tracking table if it doesn't exist
psql "$DB_URL" -q -c "
CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    executed_at TIMESTAMP NOT NULL DEFAULT NOW()
);
"

# Run pending migrations
for migration in "$SCRIPT_DIR"/migrations/*.sql; do
    [ -f "$migration" ] || continue

    name=$(basename "$migration")

    exists=$(psql "$DB_URL" -t -A -c "SELECT COUNT(*) FROM migrations WHERE name='$name';")

    if [ "$exists" = "0" ]; then
        echo "  Running: $name"
        psql "$DB_URL" -q -f "$migration"
        psql "$DB_URL" -q -c "INSERT INTO migrations (name) VALUES ('$name');"
        echo "  Done: $name"
    else
        echo "  Skipping: $name (already executed)"
    fi
done

echo "Migrations complete."
