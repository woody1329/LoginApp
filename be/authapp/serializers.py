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


class UserAsciiArtSerializer(serializers.ModelSerializer):
    # accept an uploaded image in the serializer input
    image = serializers.ImageField(write_only=True, required=True)
    # ascii_art is generated, so make it read-only
    ascii_art = serializers.CharField(read_only=True)

    class Meta:
        model = UserAsciiArt
        fields = ["image", "ascii_art"]

    # note: serializer.save(user=user) will pass user as a kwarg to create()
    def create(self, validated_data):
        image_file = validated_data.pop("image", None)
        password = validated_data.pop("password")

        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        if image_file:
            ascii_art = image_to_ascii(image_file)
            UserAsciiArt.objects.update_or_create(
                user=user,
                defaults={"ascii_art": ascii_art},
            )

        return user

class UserSerializer(serializers.ModelSerializer):
    # optional image upload during signup
    image = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ["username", "email", "password", "image"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # remove image BEFORE creating the user
        image_file = validated_data.pop("image", None)

        # handle password correctly
        password = validated_data.pop("password", None)
        user = User.objects.create_user(password=password, **validated_data)

        # if an image was uploaded, use the ascii serializer to create the model
        if image_file:
            ascii_serializer = UserAsciiArtSerializer(data={"image": image_file})
            ascii_serializer.is_valid(raise_exception=True)
            ascii_serializer.save(user=user)

        return user


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
