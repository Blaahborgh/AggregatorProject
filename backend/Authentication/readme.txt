settings.py:

    # Задать кастомного пользователя. Аутентификация не будет работать без этой строки.
    AUTH_USER_MODEL = "Authentication.User"

    REST_FRAMEWORK = {
        ...
        # авторизация - использование встроенного функционала Django
        'DEFAULT_PERMISSION_CLASSES': (
            'Authentication.permissions.CustomDjangoModelPermissions',
        ),
        # аутентификация
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework.authentication.SessionAuthentication',
        ),
        ...
    }

    # отключение CSRF защиты при включенном дебаге
    if debug:
        csrf_status = 'django.middleware.csrf.CsrfViewMiddleware'
    else:
        csrf_status = 'Authentication.middlewares.DisableCSRFMiddleware'
    MIDDLEWARE = [
        ...
        csrf_status,
        ...
    ]

    # Валидаторы паролей (минимальная длина, наличие чисел и т.д.).
    # Ограничивают всех и везде, даже суперюзера в админской панели.
    AUTH_PASSWORD_VALIDATORS = [
        # {
        #     'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        # },
        # {
        #     'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        # },
        # {
        #     'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        # },
        # {
        #     'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        # },
    ]

********************************************************************************************

API Endpoints:

    /:
        Доступ если: имеет разрешение от Django.
        GET: получение полного списка всех пользователей.
        POST: создание одного или нескольких пользователей. Пытается сохранить весь массив
        сразу (если один объект неправильный, остальные тоже не сохраняет).
        Сообщает ошибки каждого объекта (скорее всего валидация пароля или уникальность юзернейма).
        OPTIONS: информация о входных данных.

    /<int:pk>:
        Доступ если: имеет разрешение от Django.
        GET: получение только одного пользователя по id.
        PUT, PATCH: полное и частичное изменение данных одного пользователя. ПАРОЛЬ НЕ ХЕШИРУЕТСЯ!
        МЕНЯЙТЕ ПАРОЛЬ ЛИБО ЧЕРЕЗ АДМИНКУ ЛИБО ЧЕРЕЗ /change_password/.
        Если хотите изменить нескольких, легче это сделать через БД.
        DELETE: удаление пользователя.
        OPTIONS: информация о входных данных.

    /login/:
        Доступ если: НЕ аутентифицирован. Возвращает 403 в противном случае.
        POST: аутентификация (дает куки sessionid).
        OPTIONS: информация о входных данных.

    /logout/:
        Доступ если: аутентифицирован.
        POST: удаляет куки аутентификации.
        OPTIONS: информация о входных данных (которых нет).

    /change_password/:
        Доступ если: аутентифицирован.
        POST: меняет пароль аутентифицированному пользователю (тому кто сделал запрос).
        OPTIONS: информация о входных данных.

    /profile/:
        Доступ если: владелец профиля.
        GET: получить ограниченную информацию о пользователе.
        PATCH: изменение профиля (пока-что только Email).
        OPTIONS: информация о входных данных.