from django.db import models

# Create your models here.
class Resource(models.Model):
    ResoID = models.CharField(max_length=10)
    Name = models.CharField(max_length=20)
    Lat = models.DecimalField(max_digits=10, decimal_places=4)
    Lng = models.DecimalField(max_digits=10, decimal_places=4)
    Skills = models.CharField(max_length=1000)