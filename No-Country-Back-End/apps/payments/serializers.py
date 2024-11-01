from rest_framework import serializers
from .models import Payments
from apps.users.serializers import UserResponseSerializer
from apps.courses.serializers import CourseResponseSerializer


class PaymentsValidationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payments
        fields = '__all__'

    def validate(self, data):
        """
        Valida que el amount del pago sea igual al precio del curso.
        """
        course = data.get('course')
        amount = data.get('amount')

        if course and amount != course.price:
            raise serializers.ValidationError(
                {"amount": "The payment amount must be equal to the price of the course."}
            )
        
        return data


class PaymentsResponseSerializer(serializers.ModelSerializer):
    user = UserResponseSerializer(read_only=True)
    course = CourseResponseSerializer(read_only=True)
    
    class Meta:
        model = Payments
        fields = '__all__'
