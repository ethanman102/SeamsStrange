from django.apps import AppConfig
import environ

# Load environment variables
env = environ.Env()
environ.Env.read_env()

PRODUCTION_MODE = env.bool('PRODUCTION_MODE', default=False) 

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    print('hi')
    # Set the correct app name based on the environment
    if PRODUCTION_MODE:
        name = 'seamsstrangebackend.api'
    else:
        name = 'api'
