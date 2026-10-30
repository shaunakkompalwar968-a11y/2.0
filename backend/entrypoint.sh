#!/bin/bash
set -e

echo "Starting Pooja Garden Backend Entrypoint..."

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# Seed initial restaurant, lodge & gallery data if database is empty
echo "Checking & seeding initial restaurant & resort data..."
python manage.py seed_data

# Ensure admin user exists
echo "Ensuring superuser admin exists..."
python -c "
import django, os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@poojagarden.com', 'admin1234')
    print('Superuser admin created successfully!')
" || true

echo "Starting server..."
exec "$@"
