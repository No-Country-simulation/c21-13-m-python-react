from rest_framework import serializers
from .models import Course, Material
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class CourseValidationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'id',
            'title',
            'description',
            'level',
            'price',
            'duration',
            'category',
            'status',
            'date_creation'
        ]
        read_only_fields = ['id', 'date_creation', 'instructor']


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'type', 'file', 'title', 'description']
        read_only_fields = ['id', 'file', 'course']


class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class CourseResponseSerializer(serializers.ModelSerializer):
    materials = MaterialSerializer(many=True, read_only=True)
    instructor = InstructorSerializer(read_only=True)

    class Meta:
        model = Course
        fields = [
            'id',
            'title',
            'description',
            'level',
            'price',
            'duration',
            'category',
            'status',
            'date_creation',
            'materials',
            'instructor'
        ]
        read_only_fields = ['date_creation', 'materials', 'instructor']
