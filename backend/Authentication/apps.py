from django.apps import AppConfig


class AuthenticationConfig(AppConfig):
    name = 'Authentication'
    verbose_name = 'Authentication'

    # импорт "сигналов"
    def ready(self):
        import Authentication.signals
