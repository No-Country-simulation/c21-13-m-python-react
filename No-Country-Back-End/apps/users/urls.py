from django.urls import path
from . import views


# Urls para los endpoint de users
urlpatterns = [
    path('users/sign_up', views.sign_up, name='sign_up'),
    path('users/sign_in', views.sign_in, name='sign_in'),
    path('users/sign_out', views.sign_out, name='sign_out'),
    path('users/update_user', views.update_user, name='update_user'),
    path('users/delete_user', views.delete_user, name='delete_user'),
    path('users/all_users', views.get_all_users, name='get_all_users'),
    path('users/update_user/<int:user_id>', views.update_user_admin, name='update_user_admin'),
    path('users/delete_user/<int:user_id>', views.delete_user_admin, name='delete_user_admin'),
]
