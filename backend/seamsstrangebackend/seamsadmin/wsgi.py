"""
WSGI config for seamsstrangebackend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os
from pathlib import Path
import environ




# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')
PRODUCTION_MODE = env.bool('PRODUCTION_MODE')

from django.core.wsgi import get_wsgi_application

if PRODUCTION_MODE:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'seamsstrangebackend.seamsadmin.settings')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'seamsadmin.settings')

application = get_wsgi_application()

