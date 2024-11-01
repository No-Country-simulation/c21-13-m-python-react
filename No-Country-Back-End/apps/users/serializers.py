from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


class UserValidationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
    

    def validate_email(self, value):
        """
        Valida que el correo electronico sea unico.
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(f"This email {value} is already in use.")
        return value
    

    def validate_password(self, value):
        """
        Valida que la contraseña sea segura.
        """
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)    
        return value
    
    
    def create(self, validated_data):
        """
        Crea un nuevo usuario con los datos validados.
        """
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined']


class UserUpdateSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'current_password', 'new_password']

    def validate_email(self, value):
        if User.objects.filter(email=value).exclude(id=self.instance.id).exists():
            raise serializers.ValidationError(f"This email {value} is already in use.")
        return value

    def validate(self, attrs):
        # Validar que se proporcione la contraseña actual si se quiere cambiar la nueva contraseña
        if 'new_password' in attrs and not attrs.get('current_password'):
            raise serializers.ValidationError({
                'current_password': 'Current password is required to set a new password.'
            })

        # Verifica la contraseña actual si se está cambiando la nueva contraseña
        if 'current_password' in attrs and 'new_password' in attrs:
            user = self.instance
            if not user.check_password(attrs['current_password']):
                raise serializers.ValidationError({
                    'current_password': 'Current password is incorrect.'
                })

            # Validar la nueva contraseña
            try:
                validate_password(attrs['new_password'], user)
            except ValidationError as e:
                raise serializers.ValidationError({
                    'new_password': e.messages
                })

        return attrs

    def update(self, instance, validated_data):
        # Cambia los campos del usuario
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)

        # Cambia la contraseña si se proporciona
        if 'new_password' in validated_data:
            instance.set_password(validated_data['new_password'])

        instance.save()
        return instance
