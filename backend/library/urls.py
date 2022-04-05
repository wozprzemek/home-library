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

# router = routers.DefaultRouter()
# router.register(r'authors', views.author_list)
# router.register(r'books', views.book_list)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include(router.urls)),
    path('authors/', views.author_list),
    path('authors/<int:pk>/', views.author_detail),
    
    path('books/', views.book_list),
    path('books/<int:pk>/', views.book_detail),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
