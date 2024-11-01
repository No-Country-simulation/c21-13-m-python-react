from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Inscription
from .serializers import InscriptionSerializer
# Create your views here.


@api_view(['POST'])
def create_inscription(request):
    serializer = InscriptionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def list_inscriptions(request):
    inscriptions = Inscription.objects.all()
    serializer = InscriptionSerializer(inscriptions, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_inscription(request, id):
    try:
        inscription = Inscription.objects.get(id=id)
        inscription.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Inscription.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
