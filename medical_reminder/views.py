from django.shortcuts import render
from django import forms
from .models import Medicine
from medical_reminder.forms import MedicineForm
from medical_reminder.constants import FORM, UNIT
from django.contrib import messages
from django.http import HttpResponseRedirect, JsonResponse


def index(request):
    return render(request, "medical_reminder/index.html", {})


def create_medicine(request):
    
    list_medicines = Medicine.objects.filter()
    medicine_form_options = [(el, el) for el in FORM]
    medicine_unit_options = [(el, el) for el in UNIT]
    
    if request.method == "GET":
        form = MedicineForm()
        form.fields['medicine_form'].widget.choices = medicine_form_options
        form.fields['medicine_unit'].widget.choices = medicine_unit_options
        
        return render(request, "medical_reminder/create_medicine.html", {
            "form": form,
            "list_medicines": list_medicines
        })
        
    else:
        form = MedicineForm(request.POST)
        if form.is_valid():
            medicine_name = form.cleaned_data["medicine_name"]
            medicine_form = form.cleaned_data["medicine_form"]
            medicine_strength = form.cleaned_data["medicine_strength"]
            medicine_unit = form.cleaned_data["medicine_unit"]
            medicine_frequency = form.cleaned_data["medicine_frequency"]
            try:
                new_medicine = Medicine.objects.create(
                    medicine_name = medicine_name,
                    medicine_form = medicine_form,
                    medicine_strength = medicine_strength,
                    medicine_unit = medicine_unit,
                    medicine_frequency = medicine_frequency
                )
                new_medicine.save()
            except:
                messages.error(request, "Something went wrong. Try again later.")
                return render(request, "medical_reminder/create_medicine.html", {
                    form: form,
                    "list_medicines": list_medicines
                })
            messages.success(request, f"You added {medicine_name} in your medicine list")
            # return HttpResponseRedirect("medicine_list")
            return render(request, "medical_reminder/medicine_list.html", {
                "list_medicines": list_medicines
            })
        else:
            messages.error(request, "The form is not valid!")
            return render(request, "medical_reminder/create_medicine.html", {
                    form: form,
                    "list_medicines": list_medicines
                })
            
            
def medicine_list(request):
    
    list_medicines = Medicine.objects.filter()
    return render(request, "medical_reminder/medicine_list.html", {
        "list_medicines": list_medicines
    })