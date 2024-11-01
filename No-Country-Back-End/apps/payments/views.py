from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from .models import Payments
from .serializers import PaymentsValidationSerializer, PaymentsResponseSerializer


# Endpoint para obtener todos los pagos.
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def payments_list(request):
    payments = Payments.objects.all()
    serializer = PaymentsResponseSerializer(payments, many=True)
    return Response({
        'status': 'success',
        'message': 'payments obtained correctly',
        'data': {
            'payments': serializer.data
        }
    }, status=status.HTTP_200_OK)


# Endpoint para crear un nuevo pago.
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def payments_create(request):
    serializer = PaymentsValidationSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({
            'status': 'success',
            'message': 'payment created successfully',
            'data': {
                'payments': serializer.data
            }
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'status': 'error',
        'message': 'invalid data',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)
