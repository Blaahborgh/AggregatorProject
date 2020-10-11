from django.contrib import admin
from django.contrib.auth.admin import UserAdmin, GroupAdmin
from django.contrib.admin import ModelAdmin
from .models import User
from django.contrib.sessions.models import Session
from django.contrib.auth.models import Group


class MyUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'id', 'org', 'email', 'get_groups', 'get_permissions', 'is_active', 'is_staff', 'is_superuser')
    fieldsets = UserAdmin.fieldsets + (
            (None, {'fields': ('org',)}),
    )
    ordering = ('id',)


# отображение сессий в админке
class SessionAdmin(ModelAdmin):
    def _session_data(self, obj):
        return obj.get_decoded()

    list_display = ['session_key', '_session_data', 'expire_date']
    ordering = ('expire_date',)


class MyGroupAdmin(GroupAdmin):
    model = Group
    list_display = ['name', 'id']
    ordering = ('id',)


admin.site.register(User, MyUserAdmin)
admin.site.register(Session, SessionAdmin)
admin.site.unregister(Group)
admin.site.register(Group, MyGroupAdmin)
