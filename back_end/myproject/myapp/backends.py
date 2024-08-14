# myapp/backends.py
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model

class EmailBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        print(f"Attempting to authenticate email: {email}")
        UserModel = get_user_model()
        email = UserModel.objects.normalize_email(email)
        try:
            user = UserModel.objects.get(email=email)
            if user.check_password(password):
                print("Password correct")
                return user
            else:
                print("Password incorrect")
        except UserModel.DoesNotExist:
            print("User does not exist")
        return None
