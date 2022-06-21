from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('<int:room_name>/', views.room, name="room"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)