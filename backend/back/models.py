from django.db import models
from django.contrib.auth.models import User
from data.DistritosConcelhos.op import getDistritos, getConcelhos
from data.Utilizadores.op import getTipoUsers

class Utilizador(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome_completo = models.CharField(max_length=100)
    contacto = models.CharField(max_length=9, null=True)
    tipo_user = models.CharField(
        max_length=100,
        null=True,
        choices=getTipoUsers() 
    )
    morada = models.CharField(max_length=255, null=True)
    
    
    distrito = models.CharField(
        max_length=50,
        null=True,
        choices=getDistritos() 
    )
    
    concelho = models.CharField(max_length=50, null=True)
    codigo_postal = models.CharField(max_length=8, null=True)
    porta = models.CharField(max_length=10, null=True)
    
    def __str__(self):
        return f"({self.nome_completo})"
