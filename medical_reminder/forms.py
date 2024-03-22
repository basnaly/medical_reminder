from django import forms

class MedicineForm(forms.Form):
    medicine_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Name', 'class': 'form-control mb-3'}), label='')
    medicine_form = forms.CharField(widget=forms.Select(attrs={'class': 'form-control select-data mb-3'}, choices=[]), label='')
    medicine_strength = forms.FloatField(widget=forms.NumberInput(attrs={'placeholder': 'Strength', 'class': 'form-control mb-3'}), required=False, label='')
    medicine_unit = forms.CharField(widget=forms.Select(attrs={'class': 'form-control select-data mb-3'}, choices=[]), required=False, label='')
    medicine_frequency = forms.IntegerField(widget=forms.NumberInput(attrs={'placeholder': 'Frequency, days', 'class': 'form-control'}), label='')
    

class AppointmentForm(forms.Form):
    doctor_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Doctor\'s Name', 'class': 'form-control mb-3'}), label='')
    date_visit = forms.DateField(widget=forms.DateInput(attrs={'placeholder': 'Visit Date', 'type': 'date', 'class': 'form-control mb-3'}), label='')
    time_visit = forms.TimeField(widget=forms.TimeInput(attrs={'placeholder': 'Visit Time', 'type': 'time', 'class': 'form-control mb-3'}), label='')
    place_visit = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Visit Place', 'class': 'form-control mb-3'}), label='')
    notes = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Notes', 'class': 'form-control'}), required=False, label='')
    
    