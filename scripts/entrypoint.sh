#!/bin/sh
set -e

echo "=== ENTRYPOINT: Starting at $(date) ==="

echo "Running database migrations..."
npx prisma migrate deploy --schema=prisma/schema.prisma 2>&1 || echo "WARNING: Migration failed, continuing..."

echo "=== Starting application ==="
exec node server.js
