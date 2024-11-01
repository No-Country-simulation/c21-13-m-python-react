from django.urls import path
from .views import create_inscription, list_inscriptions, delete_inscription

urlpatterns = [
    path('inscriptions/create/', create_inscription, name='create_inscription'),
    path('inscriptions/get_all/', list_inscriptions, name='list_inscriptions'),
    path('inscriptions/delete/<int:id>/',
         delete_inscription, name='delete_inscription'),
]
