from django.urls import path
from . import views


# Urls para los endpoint de courses
urlpatterns = [
    path('courses/create', views.create_course, name='create_course'),
    path('courses/get_all', views.get_all_courses, name='get_all_courses'),
    path('courses/get/<int:course_id>', views.get_course_id, name='get_course_id'),
    path('courses/update/<int:course_id>', views.update_course, name='update_course'),
    path('courses/delete/<int:course_id>', views.delete_course, name='delete_course'),
    path('courses/<int:course_id>/materials', views.add_material_to_course, name='add_material_to_course'),
    path('courses/<int:course_id>/materials/<int:material_id>', views.delete_material_from_course, name='delete_material_from_course'),
]