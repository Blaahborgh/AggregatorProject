from django.core import exceptions
from rest_framework import serializers
import django.contrib.auth.password_validation as validators
from rest_framework.validators import UniqueValidator

from .models import User


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(required=True)
    groups = serializers.StringRelatedField(many=True)

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, value):
        # https://gist.github.com/leafsummer/f4d67b58a4cc77174c31935d7e299c9e
        password = value.get('password')
        errors = dict()
        try:
            validators.validate_password(password=password)
        except exceptions.ValidationError as e:
            errors['username'] = value.get('username')
            errors['password'] = list(e.messages)
        if errors:
            raise serializers.ValidationError(errors)
        return super(UserSerializer, self).validate(value)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class PasswordSerializer(serializers.Serializer):
    # https://stackoverflow.com/questions/38845051/how-to-update-user-password-in-django-rest-framework
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError(
                'Your old password was entered incorrectly. Please enter it again.'
            )
        return value

    def validate(self, value):
        # https://gist.github.com/leafsummer/f4d67b58a4cc77174c31935d7e299c9e
        password = value.get('new_password')
        errors = dict()
        try:
            validators.validate_password(password=password)
        except exceptions.ValidationError as e:
            errors['new_password'] = list(e.messages)
        if errors:
            raise serializers.ValidationError(errors)
        return super(PasswordSerializer, self).validate(value)

    def save(self):
        password = self.validated_data['new_password']
        user = self.context['request'].user
        user.set_password(password)
        user.save()


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)
    org = serializers.IntegerField(read_only=True)
    groups = serializers.StringRelatedField(read_only=True, many=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'org', 'groups')
