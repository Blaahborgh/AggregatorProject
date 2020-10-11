from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, ProfileRetrieveUpdateView
from .apps import AuthenticationConfig


app_name = AuthenticationConfig.name

router = routers.DefaultRouter()
router.register('', UserViewSet, basename='UserViewSet')

urlpatterns = [
    path('', include(router.urls)),
    path('profile/<int:pk>', ProfileRetrieveUpdateView.as_view(), name='ProfileRetrieveUpdateView'),
]
