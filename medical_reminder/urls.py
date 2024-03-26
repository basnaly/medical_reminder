from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    
    path('create_medicine', views.create_medicine, name='create_medicine'),
    path('medicine_list', views.medicine_list, name='medicine_list'),
    
    path('delete_medicine/<str:name>', views.delete_medicine, name='delete_medicine'),
    path('edit_medicine/<str:name>', views.edit_medicine, name='edit_medicine'),
    
    path('create_appointment', views.create_appointment, name='create_appointment'),
    path('edit_appointment/<str:name>', views.edit_appointment, name='edit_appointment'),
    path('delete_appointment/<str:name>', views.delete_appointment, name='delete_appointment'),
    
]