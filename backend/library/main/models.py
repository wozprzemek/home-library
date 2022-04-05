from django.db import models

class Author(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()

class Book(models.Model):
    title = models.TextField()
    author = models.ForeignKey("Author", on_delete=models.PROTECT, null=False)
    date = models.DateField()
    description = models.TextField()
