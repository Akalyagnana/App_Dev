from django.contrib import admin
from .models import User, Pickup, Feedback

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'phone', 'country', 'state', 'zipcode')
    search_fields = ('email', 'name')

@admin.register(Pickup)
class PickupAdmin(admin.ModelAdmin):
    list_display = ('id', 'item', 'weight', 'pickuptime', 'dropaddress', 'user')
    search_fields = ('item', 'user__email')

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'message', 'user')
    search_fields = ('name', 'email', 'user__email')
