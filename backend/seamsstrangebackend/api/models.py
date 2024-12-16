from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator

# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=30,validators=[MinLengthValidator(3)])
    email = models.EmailField(max_length=255,unique=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=30)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','username']

