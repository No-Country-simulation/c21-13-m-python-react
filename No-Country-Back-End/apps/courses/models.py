from django.db import models
from django.contrib.auth.models import User


class Course(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('review', 'Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    title = models.CharField(max_length=255, unique=True, blank=False)
    description = models.TextField(blank=True)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, blank=False)
    duration = models.PositiveIntegerField(blank=False)
    category = models.CharField(max_length=100, blank=True)
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    date_creation = models.DateTimeField(auto_now_add=True)


class Material(models.Model):
    TYPE_CHOICES = [
        ('video', 'Video'),
        ('pdf', 'PDF'),
        ('other', 'Other'),
    ]

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='materials')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, blank=False)
    file = models.FileField(upload_to='materials/', blank=True, null=False)
    url = models.URLField(max_length=200, blank=True)
    title = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=True)
