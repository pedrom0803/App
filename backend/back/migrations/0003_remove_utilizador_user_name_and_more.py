# Generated by Django 5.0.3 on 2024-11-15 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("back", "0002_utilizador_tipo_user"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="utilizador",
            name="user_name",
        ),
        migrations.AlterField(
            model_name="utilizador",
            name="tipo_user",
            field=models.CharField(
                choices=[
                    ("Administrador", "Administrador"),
                    ("Cliente", "Cliente"),
                    ("Driver", "Driver"),
                    ("Parceiro", "Parceiro"),
                ],
                max_length=100,
                null=True,
            ),
        ),
    ]
