from django import views
from django.urls import path
from Backend.views import user_views as views

urlpatterns = [
    path('', views.getUsers, name='Users'),
    path('login/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='UsersRegister'),
    path('profile/', views.getUserProfile, name='UserProfile'),
]
