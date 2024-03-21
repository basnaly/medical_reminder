from django.shortcuts import render
from django import forms
from .models import Medicine, Appointment
from medical_reminder.forms import MedicineForm, AppointmentForm
from medical_reminder.constants import FORM, UNIT
from django.contrib import messages
from django.http import HttpResponseRedirect, JsonResponse
import json
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt


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
    
 
@csrf_exempt   
def delete_medicine(request, name):
    
    try:
        medicine = Medicine.objects.get(id=name)
    except Medicine.DoesNotExist:
        return JsonResponse({
            'message': 'The medicine doen\'t exist!'
        })
        
    if request.method == 'DELETE':
        try:
            medicine.delete()
        except IntegrityError:
            return JsonResponse({
                'message': 'Something went wrong. Try again later.'
            })
    return JsonResponse({
        'message': f'Your medicine {medicine.medicine_name} was successfully deleted!'
    })


@csrf_exempt 
def edit_medicine(request, name):

    medicine = Medicine.objects.get(id=name)
    data = json.loads(request.body)
    changed_medicine_name = data.get('changed_medicine_name')
    changed_medicine_form = data.get('changed_medicine_form')
    changed_medicine_strength = data.get('changed_medicine_strength')
    changed_medicine_unit = data.get('changed_medicine_unit')
    changed_medicine_frequency = data.get('changed_medicine_frequency')
    if not changed_medicine_name or not changed_medicine_form:
        return JsonResponse({
            'message': 'The input fields name and form cannot be empty!'
        })
    
    try:
        medicine.medicine_name = changed_medicine_name
        medicine.medicine_form = changed_medicine_form
        medicine.medicine_strength = changed_medicine_strength
        medicine.medicine_unit = changed_medicine_unit
        medicine.medicine_frequency = changed_medicine_frequency
        medicine.save()
    except IntegrityError:
        return JsonResponse({
            'message': 'Something went wrong. Try again later.'
        })
    return JsonResponse({
        'message': f'Your { medicine.medicine_name } medicine was successfully updated!'
    })
    
    
def create_appointment(request):
    
    appointment_list = Appointment.objects.filter()
    if request.method == "GET":
        form = AppointmentForm()
        
        return render(request, "medical_reminder/appointment.html", {
            "form": form,
            "appointment_list": appointment_list
        })
        
    else:
        form = AppointmentForm(request.POST)
        if form.is_valid():
            doctor_name = form.cleaned_data["doctor_name"]
            date_visit = form.cleaned_data["date_visit"]
            time_visit = form.cleaned_data["time_visit"]
            place_visit = form.cleaned_data["place_visit"]
            notes = form.cleaned_data["notes"]
            try:
                new_appointment = Appointment.objects.create(
                    doctor_name = doctor_name,
                    date_visit = date_visit,
                    time_visit = time_visit,
                    place_visit = place_visit,
                    notes = notes
                )
                new_appointment.save()
            except:
                messages.error(request, "Something went wrong. Try again later.")
                return render(request, "medical_reminder/appointment.html", {
                    form: form,
                    "appointment_list": appointment_list
                })
            messages.success(request, f"You added visit to D-r {doctor_name} to your appointment list!")
            return render(request, "medical_reminder/appointment.html", {
                "appointment_list": appointment_list
            })
        else:
            messages.error(request, "The form is not valid!")
            return render(request, "medical_reminder/appointment.html", {
                    form: form,
                    "appointment_list": appointment_list
                })
            
            
            