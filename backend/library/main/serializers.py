from rest_framework import serializers
from library.main.models import Author, Book

class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = ['first_name', 'last_name']


class BookSerializer(serializers.HyperlinkedModelSerializer):
    # author = AuthorSerializer(source='first_name')
    class Meta:
        model = Book
        fields = ['title', 'author', 'date']