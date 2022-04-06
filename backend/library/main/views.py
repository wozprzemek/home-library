from re import A
from telnetlib import AYT
from django.shortcuts import render
from rest_framework.response import Response

from rest_framework import status
from rest_framework import viewsets
from rest_framework import permissions
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from library.main.serializers import AuthorSerializer, BookSerializer
from library.main.models import Author, Book

# class AuthorViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows authors to be viewed or edited.
#     """
#     queryset = Author.objects.all()
#     serializer_class = AuthorSerializer
#     # permission_classes = [permissions.IsAuthenticated]


# class BookViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows books to be viewed or edited.
#     """
#     queryset = Book.objects.all()
#     serializer_class = BookSerializer
#     # permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
def get_all_authors(request):
    """
    Returns the list of all authors
    """
    authors = Author.objects.all()
    serializer = AuthorSerializer(authors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_author(request, pk):
    """
    Returns the details of a selected author
    """
    try:
        author = Author.objects.get(pk=pk)
        serializer = AuthorSerializer(author)
        return Response(serializer.data)
    except Author.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def add_author(request):
    """
    Adds an author
    """
    serializer = AuthorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def edit_author(request, pk):
    """
    Updates a selected author
    """
    author = Author.objects.get(id=pk)
    serializer = AuthorSerializer(instance=author, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_author(request, pk):
    """
    Delete a selected author
    """
    author = Author.objects.get(id=pk)
    author.delete()
    
    return Response(status=status.HTTP_200_OK)