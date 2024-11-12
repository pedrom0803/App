from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Utilizador(models.Model):
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome = models.CharField()
    morada = models.CharField(null=True)
    contacto = models.CharField(max_length=9,null=True)
    codigo_postal= models.CharField(max_length=8,null=True)
    distrito  = models.CharField(null=True,choices=Distritos)
    
    