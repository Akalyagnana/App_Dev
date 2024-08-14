from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import User, Pickup, Feedback
from .serializers import UserSerializer, PickupSerializer, FeedbackSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        identifier = self.kwargs['identifier']

        if identifier.isdigit():
            # Lookup by ID
            filter_kwargs = {'id': identifier}
        else:
            # Lookup by email
            filter_kwargs = {'email': identifier}
        
        obj = get_object_or_404(queryset, **filter_kwargs)
        return obj

class PickupList(generics.ListCreateAPIView):
    queryset = Pickup.objects.all()
    serializer_class = PickupSerializer
    permission_classes = [IsAuthenticated]

class PickupDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pickup.objects.all()
    serializer_class = PickupSerializer
    permission_classes = [IsAuthenticated]

class FeedbackList(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]

class FeedbackDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]



class LoginView(APIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        print(f"Login attempt with email: {email}")
        user = authenticate(request, email=email, password=password)
        if user is not None:
            print(f"User authenticated: {user.email}")
            return Response({"detail": "Login successful", "user": UserSerializer(user).data}, status=status.HTTP_200_OK)
        else:
            print("Invalid credentials")
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
