#!/bin/sh

echo "Waiting for PostgreSQL..."

while ! nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
  sleep 1
done

echo "PostgreSQL is up and running..."
exec "$@"
