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

# AUTHORS
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


# BOOKS 
@api_view(['GET'])
def get_all_books(request):
    """
    Returns the list of all books
    """
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_book(request, pk):
    """
    Returns the details of a selected book
    """
    try:
        book = Book.objects.get(pk=pk)
        serializer = BookSerializer(book)
        return Response(serializer.data)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def add_book(request):
    """
    Adds an author
    """
    serializer = BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def edit_book(request, pk):
    """
    Updates a selected book
    """
    book = Book.objects.get(id=pk)
    serializer = BookSerializer(instance=book, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_book(request, pk):
    """
    Delete a selected book
    """
    book = Book.objects.get(id=pk)
    book.delete()
    
    return Response(status=status.HTTP_200_OK)