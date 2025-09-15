from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import UserAsciiArt
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserAsciiArt
from .utils import image_to_ascii  # your function to convert image to ASCII

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserAsciiArt
from .utils import image_to_ascii

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserAsciiArt
from .utils import image_to_ascii  # your converter function

User = get_user_model()

class UserWithArtSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(write_only=True, required=False)
    ascii_art = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "image", "ascii_art"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        image_file = validated_data.pop("image", None)
        password = validated_data.pop("password")

        # create user
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        # generate ascii art if image provided
        if image_file:
            ascii_art = image_to_ascii(image_file)
            UserAsciiArt.objects.create(user=user, ascii_art=ascii_art)

        return user

    def to_representation(self, instance):
        """Add ascii_art to output if exists"""
        rep = super().to_representation(instance)
        rep["ascii_art"] = getattr(instance.userasciiart, "ascii_art", None)
        return rep



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


# class UserAsciiArtSerializer(serializers.ModelSerializer):
#     image = serializers.ImageField(write_only=True, required=True)

#     class Meta:
#         model = UserAsciiArt
#         fields = ["image", "ascii_art"]
#         read_only_fields = ["ascii_art"]

#     def create(self, validated_data):
#         image_file = validated_data.pop("image")
#         ascii_str = image_to_ascii(image_file)
#         return UserAsciiArt.objects.create(ascii_art=ascii_str, **validated_data)
