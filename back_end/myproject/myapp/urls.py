from django.urls import path
from .views import UserList, UserDetail, PickupList, PickupDetail, FeedbackList, FeedbackDetail

urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('pickups/', PickupList.as_view(), name='pickup-list'),
    path('pickups/<int:pk>/', PickupDetail.as_view(), name='pickup-detail'),
    path('feedbacks/', FeedbackList.as_view(), name='feedback-list'),
    path('feedbacks/<int:pk>/', FeedbackDetail.as_view(), name='feedback-detail'),
]
