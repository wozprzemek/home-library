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

# AUTHORS
@api_view(['GET'])
def get_all_authors(request):
    authors = Author.objects.all()
    serializer = AuthorSerializer(authors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_author(request, pk):
    try:
        author = Author.objects.get(pk=pk)
        serializer = AuthorSerializer(author)
        return Response(serializer.data)
    except Author.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def add_author(request):
    serializer = AuthorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@csrf_exempt
def author_list(request, format=None):
    """
    List all authors or create new author
    """
    if request.method == 'GET':
        authors = Author.objects.all()
        serializer = AuthorSerializer(authors, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        print('1-------------------------------------->',request.data)
        print('2-------------------------------------->',JSONParser().parse(request))
        data = JSONParser().parse(request)
        serializer = AuthorSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@csrf_exempt
def author_detail(request, pk, format=None):
    """
    Retrieve, update or delete an author record.
    """
    try:
        author = Author.objects.get(pk=pk)
    except Author.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AuthorSerializer(author)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = AuthorSerializer(author, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        author.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# BOOKS

@api_view(['GET', 'POST'])
@csrf_exempt
def book_list(request, format=None):
    """
    List all authors or create new author
    """
    if request.method == 'GET':
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return JsonResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@csrf_exempt
def book_detail(request, pk, format=None):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BookSerializer(book)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = AuthorSerializer(book, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)