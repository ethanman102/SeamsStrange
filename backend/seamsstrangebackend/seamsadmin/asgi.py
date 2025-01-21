"""
ASGI config for seamsstrangebackend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

from pathlib import Path
import environ

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')
PRODUCTION_MODE = env.bool('PRODUCTION_MODE')

import os

from django.core.asgi import get_asgi_application

if PRODUCTION_MODE:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'seamsstrangebackend.seamsadmin.settings')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'seamsadmin.settings')

application = get_asgi_application()
