"""
https://gist.github.com/twidi/9d55486c36b6a51bdcb05ce3a763e79f
Sometimes in your Django model you want to raise a ``ValidationError`` in the ``save`` method, for
some reason.
This exception is not managed by Django Rest Framework because it occurs after its validation
process. So at the end, you'll have a 500.
Correcting this is as simple as overriding the exception handler, by converting the Django
``ValidationError`` to a DRF one.
"""

from django.core.exceptions import ValidationError as DjangoValidationError
from pip._internal.utils import logging

from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.views import exception_handler as drf_exception_handler


def exception_handler(exception, context):
    """Handle Django ValidationError as an accepted exception
    Must be set in settings:
    >>> REST_FRAMEWORK = {
    ...     # ...
    ...     'EXCEPTION_HANDLER': 'Authentication.exception_handler.exception_handler',
    ...     # ...
    ... }
    For the parameters, see ``exception_handler``
    """

    if isinstance(exception, DjangoValidationError):
        if isinstance(exception, DjangoValidationError):
            if hasattr(exception, 'message_dict'):
                detail = exception.message_dict
            elif hasattr(exception, 'message'):
                detail = exception.message
            elif hasattr(exception, 'messages'):
                detail = exception.messages
            else:
                logging.error("BAD VALIDATION MESSAGE: %s" % exception)

            exception = DRFValidationError(detail={"detail": detail})

    return drf_exception_handler(exception, context)