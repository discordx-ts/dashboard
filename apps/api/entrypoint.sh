#!/bin/bash
set -e

echo "Running database migration..."
cd /app/node_modules/@workspace/database
npm run db:migrate

# Execute the main process (the CMD passed to the script)
cd /app
exec "$@"
