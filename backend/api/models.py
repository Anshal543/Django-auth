from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    tfa_secret = models.CharField(max_length=255, default='')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
class UserToken(models.Model):
    user_id = models.IntegerField()
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)  
    expired_at = models.DateTimeField()  
    
class ResetPassword(models.Model):
    email = models.EmailField(max_length=255)
    token = models.CharField(max_length=255,unique=True)    
    