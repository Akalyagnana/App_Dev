from rest_framework import serializers
from .models import User, Pickup, Feedback

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'phone', 'password', 'country', 'state', 'zipcode']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

class PickupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pickup
        fields = ['id', 'item', 'weight', 'pickuptime', 'dropaddress', 'user']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'user', 'name', 'email', 'message']
