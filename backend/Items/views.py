from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from .models import Novel, Author, Tag
from .serializers import NovelSerializer, AuthorSerielizer, TagSerializer
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as rf_filters


class NovelFilter(rf_filters.FilterSet):
    tags = rf_filters.ModelMultipleChoiceFilter(
        field_name='tags__name',
        to_field_name='name',
        queryset=Tag.objects.all(),
        conjoined=True,
        lookup_expr='iexact'
    )
    author = rf_filters.ModelChoiceFilter(
        field_name='author__name',
        to_field_name='name',
        queryset=Author.objects.all(),
        lookup_expr='iexact'
    )
    chcount = rf_filters.RangeFilter(
        field_name='chcount',
    )

    class Meta:
        model = Novel
        fields = ['tags', 'author', 'chcount']


class StandardNovelPagination(PageNumberPagination):
    page_size = 20

    def get_paginated_response(self, data):
        response = super(StandardNovelPagination, self).get_paginated_response(data)
        response.data['pages'] = self.page.paginator.num_pages
        return response


class StandardAuthorPagination(PageNumberPagination):
    page_size = 20

    def get_paginated_response(self, data):
        response = super(StandardAuthorPagination, self).get_paginated_response(data)
        response.data['pages'] = self.page.paginator.num_pages
        return response


class NovelViewSet(viewsets.ModelViewSet):
    queryset = Novel.objects.all()
    serializer_class = NovelSerializer
    pagination_class = StandardNovelPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = NovelFilter
    search_fields = ['name']
    ordering_fields = ['author', 'chcount']


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerielizer
    pagination_class = StandardAuthorPagination


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
