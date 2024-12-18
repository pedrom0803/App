# Generated by Django 5.1.3 on 2024-11-12 15:05

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Utilizador",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nome_completo", models.CharField(max_length=100)),
                ("user_name", models.CharField(max_length=50)),
                ("contacto", models.CharField(max_length=9, null=True)),
                ("morada", models.CharField(max_length=255, null=True)),
                (
                    "distrito",
                    models.CharField(
                        choices=[
                            ("Aveiro", "Aveiro"),
                            ("Beja", "Beja"),
                            ("Braga", "Braga"),
                            ("Bragança", "Bragança"),
                            ("Castelo Branco", "Castelo Branco"),
                            ("Coimbra", "Coimbra"),
                            ("Évora", "Évora"),
                            ("Faro", "Faro"),
                            ("Guarda", "Guarda"),
                            ("Leiria", "Leiria"),
                            ("Lisboa", "Lisboa"),
                            ("Portalegre", "Portalegre"),
                            ("Porto", "Porto"),
                            ("Santarém", "Santarém"),
                            ("Setúbal", "Setúbal"),
                            ("Viana do Castelo", "Viana do Castelo"),
                            ("Vila Real", "Vila Real"),
                            ("Viseu", "Viseu"),
                        ],
                        max_length=50,
                        null=True,
                    ),
                ),
                ("concelho", models.CharField(max_length=50, null=True)),
                ("codigo_postal", models.CharField(max_length=8, null=True)),
                ("porta", models.CharField(max_length=10, null=True)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
