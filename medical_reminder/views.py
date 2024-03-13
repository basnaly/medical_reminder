from django.shortcuts import render
from django import forms
from .models import Medicine
from medical_reminder.forms import MedicineForm


def index(request):
    return render(request, "medical_reminder/index.html", {})


def create_medicine(request):
    list_medicines = Medicine.objects.filter()
    if request.method == "GET":
        return render(request, "medical_reminder/create_medicine.html", {
            "form": MedicineForm,
        })