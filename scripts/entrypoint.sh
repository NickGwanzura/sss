#!/bin/sh
set -e

echo "=== ENTRYPOINT: Starting at $(date) ==="

echo "Running database migrations..."
npx prisma migrate deploy --schema=prisma/schema.prisma 2>&1 || echo "WARNING: Migration failed, continuing..."

echo "Running database seed (if admin user does not exist)..."
ADMIN_EMAIL="nicholas.gwanzura@outlook.com" \
ADMIN_PASSWORD="Zubi@2030" \
npx tsx prisma/seed.ts 2>&1 || echo "WARNING: Seed failed, continuing..."

echo "=== Starting application ==="
exec node server.js
