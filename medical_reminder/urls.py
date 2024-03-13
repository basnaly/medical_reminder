from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    
    path('create_medicine', views.create_medicine, name='create_medicine'),
]