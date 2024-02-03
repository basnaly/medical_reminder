from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    
    def __str__(self):
        return f'{self.username}, {self.first_name}, {self.last_name}, {self.email}'
    
class Medicine(models.Model):
    name = models.CharField(max_length=120)
    form = models.CharField(max_length=60)
    strength = models.FloatField(blank=True, null=True)
    unit = models.CharField(max_length=20)
    frequency = models.CharField(max_length=20)
    
    def __str__(self):
        return f'{self.name}, {self.form}, {self.strength}, {self.unit}, {self.frequency}'