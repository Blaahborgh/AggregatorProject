from django.core.exceptions import ValidationError
from rest_framework.decorators import action
from rest_framework import permissions, viewsets
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.http import HttpResponse
from django.utils.encoding import iri_to_uri
from .permissions import ProfilePermission
from .serializers import UserSerializer, ProfileSerializer, PasswordSerializer
from .models import User
import json


# имплементация временного перенаправления, чтобы передавать через него не-GET запросы
# (from django.shortcuts import redirect возвращает только статусы 301 или 302, которые режут "небезопасные" запросы)
class HttpResponseTemporaryRedirect(HttpResponse):
    status_code = 307

    def __init__(self, redirect_to):
        HttpResponse.__init__(self)
        self['Location'] = iri_to_uri(redirect_to)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        response = []
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)
            response.append(serializer.data)
        else:
            response.append({"error": "asd"})
        return Response(response, status=201)

    @action(methods=['post', ], detail=False, permission_classes=[permissions.AllowAny, ])
    def login(self, request):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        if request.user.is_authenticated:
            return Response(
                {"detail": "Already logged in"},
                status=403
            )
        user = authenticate(username=username, password=password)
        if user is not None and user.is_active:
            login(request, user)
            serializer = ProfileSerializer(user)
            return Response(
                serializer.data,
                status=200
            )
        elif user is None:
            return Response(
                {"detail": "Invalid credentials"},
                status=400,
            )
        elif not user.is_active:
            return Response(
                {"detail": "User is blocked"},
                status=403,
            )

    @action(methods=['post', ], detail=False, permission_classes=[permissions.IsAuthenticated, ])
    def logout(self, request):
        logout(request)
        return Response(
            {"detail": "Success"},
            status=200
        )

    @action(methods=['post', ], detail=False, permission_classes=[permissions.IsAuthenticated, ])
    def change_password(self, request):
        serializer = PasswordSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        update_session_auth_hash(request, request.user)
        return Response(
            {'detail': 'New password set'},
            status=200
        )

    @action(methods=['get', 'patch', ], detail=False, permission_classes=[permissions.IsAuthenticated])
    def profile(self, request):
        return HttpResponseTemporaryRedirect(request.path + str(request.user.id))

    @method_decorator(ensure_csrf_cookie)
    @action(methods=['get', ], detail=False, permission_classes=[permissions.AllowAny, ])
    def set_csrf_cookie(self, request):
        return Response(
            {"details": "CSRF cookie set"},
            status=200
        )


class ProfileRetrieveUpdateView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [ProfilePermission]
