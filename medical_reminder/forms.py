from django import forms

class MedicineForm(forms.Form):
    name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Name', 'class': 'form-control mb-3'}), label='')
    form = forms.CharField(widget=forms.Select(attrs={'class': 'form-control select-data mb-3'}, choices=[]), label='')
    strength = forms.FloatField(widget=forms.NumberInput(attrs={'placeholder': 'Strength', 'class': 'form-control mb-3'}), required=False, label='')
    unit = forms.CharField(widget=forms.Select(attrs={'class': 'form-control select-data mb-3'}, choices=[]), required=False, label='')
    frequency = forms.IntegerField(widget=forms.NumberInput(attrs={'placeholder': 'Frequency, days', 'class': 'form-control'}), label='')