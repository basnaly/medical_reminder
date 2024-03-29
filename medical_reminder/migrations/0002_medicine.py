# Generated by Django 4.2.6 on 2024-02-05 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("medical_reminder", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Medicine",
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
                ("name", models.CharField(max_length=120)),
                ("form", models.CharField(max_length=60)),
                ("strength", models.FloatField(blank=True, null=True)),
                ("unit", models.CharField(blank=True, max_length=20, null=True)),
                ("frequency", models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]
