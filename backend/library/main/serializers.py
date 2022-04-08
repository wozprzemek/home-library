from rest_framework import serializers
from library.main.models import Author, Book

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('__all__')


class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()

    class Meta:
        model = Book
        # depth = 1
        fields = ('__all__')

    def create(self, validated_data):
        author_data = validated_data.pop('author')
        author = Author.objects.create(**author_data)
        book = Book.objects.create(author=author, **validated_data)
        return book

    def update(self, instance, validated_data):
        author_data = validated_data.pop('author')
        # Unless the application properly enforces that this field is
        # always set, the following could raise a `DoesNotExist`, which
        # would need to be handled.
        author = instance.author

        author.first_name = author_data.get('first_name', author.first_name)
        author.last_name = author_data.get('last_name', author.last_name)
        author.save()

        instance.title = validated_data.get('title', instance.title)
        instance.release_date = validated_data.get('release_date', instance.release_date)
        instance.description = validated_data.get('description', instance.description)
        instance.author = validated_data.get('author', author)
        instance.save()

        return instance

