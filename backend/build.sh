#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "=================================================="
echo "==> Starting Pooja Garden Backend Build on Render"
echo "=================================================="

echo "==> Upgrading pip..."
pip install --upgrade pip

echo "==> Installing Python dependencies..."
pip install -r requirements.txt

echo "==> Collecting static files with WhiteNoise..."
python manage.py collectstatic --no-input

echo "==> Running database migrations..."
python manage.py migrate --no-input

echo "==> Seeding initial restaurant & resort data..."
python manage.py seed_data || true

echo "==> Ensuring superuser admin exists..."
python -c "
import django, os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@poojagarden.com', 'admin1234')
    print('Superuser admin created successfully!')
else:
    print('Superuser admin already exists.')
" || true

echo "=================================================="
echo "==> Build finished successfully!"
echo "=================================================="
