from rest_framework import serializers
from .models import Novel, Author, Tag

class NovelSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(many=False)
    tags = serializers.StringRelatedField(many=True)
    class Meta:
        model = Novel
        fields = '__all__'

class AuthorSerielizer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'