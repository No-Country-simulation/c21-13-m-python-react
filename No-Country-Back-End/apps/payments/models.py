from django.db import models
from django.contrib.auth.models import User
from apps.courses.models import Course

class Payments(models.Model):
    METHOD_CHOICES = [
        ('paypal', 'Paypal'),
        ('transfer', 'Transfer'),
        ('credit card', 'Credit Card'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=20, choices=METHOD_CHOICES, blank=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, blank=False)
    ident = models.TextField(max_length=10, unique=True, editable=False)  # Campo ID personalizado


    def save(self, *args, **kwargs):
        # Genera el identificador solo si no está asignado
        if not self.ident:
            # Obtenemos el último registro de pagos para el ID
            last_payment = Payments.objects.all().order_by('id').last()
            
            if last_payment and last_payment.ident.startswith("#PAY") and last_payment.ident[4:].isdigit():
                # Extraemos y convertimos los últimos 4 caracteres a número si están en el formato adecuado
                last_id = int(last_payment.ident[-4:])
                new_id = f"#PAY{last_id + 1:04d}"  # Incrementa y formatea
            else:
                # Si no hay un último ID válido, comenzamos en "#PAY0001"
                new_id = "#PAY0001"

            self.ident = new_id

        super().save(*args, **kwargs)  # Guardamos el objeto normalmente
