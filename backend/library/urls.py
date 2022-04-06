"""library URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from library.main import views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Author URLs
    path('authors/', views.get_all_authors),
    path('authors/add/', views.add_author),
    path('authors/<int:pk>/', views.get_author),
    path('authors/edit/<int:pk>/', views.edit_author),
    path('authors/delete/<int:pk>/', views.delete_author),

    # Book URLs
    path('books/', views.get_all_books),
    path('books/add/', views.add_book),
    path('books/<int:pk>/', views.get_book),
    path('books/edit/<int:pk>/', views.edit_book),
    path('books/delete/<int:pk>/', views.delete_book),
    

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
