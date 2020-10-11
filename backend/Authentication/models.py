from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.sessions.models import Session


class User(AbstractUser):
    org = models.IntegerField(blank=True, null=True, verbose_name="Organization")

    def __str__(self):
        return self.username

    # конвертация полей многие ко многим в строку
    def get_permissions(self, obj=None):
        if self.is_superuser:
            return "All permissions"
        return ", ".join([p for p in self.get_all_permissions()])
    #verbose_name для метода
    get_permissions.short_description = "Permissions"

    def get_groups(self):
        return ", ".join([u.name for u in self.groups.all()])
    get_groups.short_description = "Groups"


# связывание сессий к пользователям
# (используется для предотвращения нескольких сессий для одного пользователя, см. signals.py)
class UserSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session = models.OneToOneField(Session, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
