from django.urls import path
from .views import UserList, UserDetail, PickupList, PickupDetail, FeedbackList, FeedbackDetail,LoginView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<str:identifier>/', UserDetail.as_view(), name='user-detail'), 
    path('pickups/', PickupList.as_view(), name='pickup-list'),
    path('pickups/<int:pk>/', PickupDetail.as_view(), name='pickup-detail'),
    path('feedbacks/', FeedbackList.as_view(), name='feedback-list'),
    path('feedbacks/<int:pk>/', FeedbackDetail.as_view(), name='feedback-detail'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
