from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    
    def __str__(self):
        return f'{self.username}, {self.first_name}, {self.last_name}, {self.email}'
    
class Medicine(models.Model):
    medicine_name = models.CharField(max_length=120)
    medicine_form = models.CharField(max_length=60)
    medicine_strength = models.FloatField(blank=True, null=True)
    medicine_unit = models.CharField(max_length=20, blank=True, null=True)
    medicine_frequency = models.IntegerField(blank=True, null=True)
    
    def __str__(self):
        return f'{self.medicine_name}, {self.medicine_form}, {self.medicine_strength}, {self.medicine_unit}, {self.medicine_frequency}'
    

class Appointment(models.Model):
    doctor_name = models.CharField(max_length=120)
    date_visit = models.DateField()
    time_visit = models.TimeField()
    place_visit = models.CharField(max_length=1020)
    notes = models.CharField(max_length=2050, blank=True, null=True)
    
    def __str__(self):
        return f'{self.doctor_name}, {self.date_visit}, {self.time_visit}, {self.place_visit}, {self.notes}'
    
    