# Generated by Django 4.2.6 on 2024-03-21 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("medical_reminder", "0003_rename_form_medicine_medicine_form_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Appointment",
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
                ("doctor_name", models.CharField(max_length=120)),
                ("date_visit", models.DateField()),
                ("time_visit", models.TimeField()),
                ("place_visit", models.CharField(max_length=1020)),
                ("notes", models.CharField(max_length=2050)),
            ],
        ),
    ]
