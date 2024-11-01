from django.urls import path
from . import views

urlpatterns = [
    path('payments/get_all', views.payments_list, name='payments_list'),
    path('payments/create', views.payments_create, name='payments_create'),
]
