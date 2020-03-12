from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination

from .models import Novel, Author, Tag
from .serializers import NovelSerializer, AuthorSerielizer, TagSerializer


class StandardNovelPagination(PageNumberPagination):
    page_size = 5

    def get_paginated_response(self, data):
        response = super(StandardNovelPagination, self).get_paginated_response(data)
        response.data['pages'] = self.page.paginator.num_pages
        return response


class NovelViewSet(viewsets.ModelViewSet):
    queryset = Novel.objects.all()
    serializer_class = NovelSerializer
    pagination_class = StandardNovelPagination


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerielizer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
