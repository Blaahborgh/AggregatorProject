import copy
from rest_framework import permissions


# применение Django разрешений на GET запросы к вьюшкам DRF (не реализовано по дефолту, см. официальную документацию)
class CustomDjangoModelPermissions(permissions.DjangoModelPermissions):
    def __init__(self):
        self.perms_map = copy.deepcopy(self.perms_map)  # you need deepcopy when you inherit a dictionary type
        self.perms_map['GET'] = ['%(app_label)s.view_%(model_name)s']


# разрешение объектного уровня: доступ пользователя к собственным данным
class ProfilePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.id == request.user.id