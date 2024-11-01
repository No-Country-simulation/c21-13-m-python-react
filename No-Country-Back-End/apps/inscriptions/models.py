from django.db import models

# Create your models here.


class Inscription(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('paid', 'Pagado'),
        ('canceled', 'Cancelado'),
    ]
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    # O puedes crear un ForeignKey a tu modelo de curso
    course_id = models.IntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Inscription of {self.user} to course {self.course_id}'
