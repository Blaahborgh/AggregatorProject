from rest_framework import viewsets
from .models import Novel, Author, Tag
from .serializers import NovelSerializer, AuthorSerielizer, TagSerializer

# Create your views here.

class NovelViewSet(viewsets.ModelViewSet):
    queryset = Novel.objects.all()
    serializer_class = NovelSerializer

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerielizer

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer