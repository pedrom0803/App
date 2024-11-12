from django.db import models
from django.contrib.auth.models import User
from data.op import *

# Create your models here.
class Utilizador(models.Model):
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome_completo = models.CharField()
    user_name = models.CharField(max_length=50)
    contacto = models.CharField(max_length=9,null=True)
    morada = models.CharField(null=True)
    distrito  = models.CharField(null=True,choices=getDistritos())
    concelho = models.CharField(null=True,choices=getConcelhos(distrito))
    codigo_postal= models.CharField(max_length=8,null=True)
    porta = models.CharField(null=True)
    
    
    
    