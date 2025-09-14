#!/bin/sh

# Retry migrations 5 times with sleep to account for db ready
n=0
until python manage.py migrate --noinput || [ $n -ge 5 ]; do
  echo "Database not ready, sleeping..."
  n=$((n+1))
  sleep 2
done

# Collect static files (optional)
python manage.py collectstatic --noinput

# Start server
exec "$@"
