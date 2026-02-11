# Django Backend Integration Guide

This guide provides complete instructions for setting up the Django backend to work with the React frontend.

## Table of Contents
1. [Project Setup](#project-setup)
2. [Models](#models)
3. [Serializers](#serializers)
4. [Views](#views)
5. [URLs](#urls)
6. [Authentication](#authentication)
7. [Environment Variables](#environment-variables)
8. [CORS Configuration](#cors-configuration)

---

## Project Setup

### 1. Create Django Project

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers pillow

# Create project
django-admin startproject investment_backend
cd investment_backend

# Create app
python manage.py startapp api
```

### 2. Update settings.py

```python
# investment_backend/settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    
    # Local apps
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add this at the top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# JWT Configuration
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite default port
    "http://localhost:3000",  # Common React port
]

CORS_ALLOW_CREDENTIALS = True

# Media files for KYC documents
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

---

## Models

### api/models.py

```python
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import secrets
import string

class User(AbstractUser):
    """Extended User model"""
    ROLE_CHOICES = [
        ('customer', 'Customer'),
        ('admin', 'Admin'),
    ]
    
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('ar', 'Arabic'),
    ]
    
    balance = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    referral_code = models.CharField(max_length=10, unique=True, blank=True)
    referred_by = models.ForeignKey(
        'self', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='referrals'
    )
    is_verified = models.BooleanField(default=False)
    is_kyc_verified = models.BooleanField(default=False)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='en')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if not self.referral_code:
            self.referral_code = self.generate_referral_code()
        super().save(*args, **kwargs)
    
    @staticmethod
    def generate_referral_code():
        """Generate unique 8-character referral code"""
        while True:
            code = ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(8))
            if not User.objects.filter(referral_code=code).exists():
                return code


class InvestmentPack(models.Model):
    """Investment packages"""
    name = models.CharField(max_length=100)
    min_amount = models.DecimalField(max_digits=20, decimal_places=2)
    max_amount = models.DecimalField(max_digits=20, decimal_places=2)
    daily_return_rate = models.DecimalField(max_digits=5, decimal_places=2)  # Percentage
    duration_days = models.IntegerField(default=60)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name


class UserInvestment(models.Model):
    """User's active investments"""
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='investments')
    pack = models.ForeignKey(InvestmentPack, on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()
    daily_return = models.DecimalField(max_digits=20, decimal_places=2)
    total_return = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        if not self.end_date:
            from datetime import timedelta
            self.end_date = self.start_date + timedelta(days=self.pack.duration_days)
        if not self.daily_return:
            self.daily_return = (self.amount * self.pack.daily_return_rate) / 100
        super().save(*args, **kwargs)
    
    @property
    def days_elapsed(self):
        """Calculate days since investment started"""
        from datetime import date
        if self.status != 'active':
            return (self.end_date - self.start_date).days
        return (date.today() - self.start_date).days


class Transaction(models.Model):
    """All transactions (deposits, withdrawals, earnings)"""
    TYPE_CHOICES = [
        ('deposit', 'Deposit'),
        ('withdrawal', 'Withdrawal'),
        ('earning', 'Earning'),
        ('referral_commission', 'Referral Commission'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    wallet_address = models.CharField(max_length=200, blank=True)
    transaction_hash = models.CharField(max_length=200, blank=True)
    admin_note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']


class ReferralPack(models.Model):
    """Referral milestone rewards"""
    name = models.CharField(max_length=50)
    required_referrals = models.IntegerField()
    reward_amount = models.DecimalField(max_digits=20, decimal_places=2)
    icon = models.CharField(max_length=50, default='trophy')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['required_referrals']
    
    def __str__(self):
        return self.name


class ReferralCommission(models.Model):
    """Track referral commissions"""
    referrer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commissions_earned')
    referred_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='referred_from')
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    investment = models.ForeignKey(UserInvestment, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class KYCVerification(models.Model):
    """KYC verification documents"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='kyc')
    full_name = models.CharField(max_length=200)
    date_of_birth = models.DateField()
    country = models.CharField(max_length=100)
    id_type = models.CharField(max_length=50)
    id_number = models.CharField(max_length=100)
    id_front_image = models.ImageField(upload_to='kyc/id_front/')
    id_back_image = models.ImageField(upload_to='kyc/id_back/', blank=True, null=True)
    selfie_image = models.ImageField(upload_to='kyc/selfie/')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    admin_note = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)


class Message(models.Model):
    """User-Admin messaging system"""
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    subject = models.CharField(max_length=200)
    message = models.TextField()
    offer_platform = models.CharField(
        max_length=20, 
        choices=[
            ('facebook', 'Facebook'),
            ('instagram', 'Instagram'),
            ('youtube', 'YouTube'),
        ],
        blank=True
    )
    submitted_link = models.URLField(blank=True)
    link_status = models.CharField(
        max_length=10,
        choices=[
            ('pending', 'Pending'),
            ('approved', 'Approved'),
            ('rejected', 'Rejected'),
        ],
        blank=True
    )
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
```

---

## Serializers

### api/serializers.py

```python
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    InvestmentPack, UserInvestment, Transaction,
    ReferralPack, ReferralCommission, KYCVerification, Message
)

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'balance', 'referral_code', 'is_verified', 'is_kyc_verified',
            'created_at', 'role', 'language'
        ]
        read_only_fields = ['id', 'referral_code', 'balance', 'created_at']


class SignupSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(write_only=True)
    referral_code = serializers.CharField(required=False, allow_blank=True)
    
    class Meta:
        model = User
        fields = [
            'email', 'username', 'password', 'password_confirm',
            'first_name', 'last_name', 'referral_code'
        ]
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords do not match")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        referral_code = validated_data.pop('referral_code', None)
        
        # Find referrer if code provided
        referred_by = None
        if referral_code:
            try:
                referred_by = User.objects.get(referral_code=referral_code)
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid referral code")
        
        user = User.objects.create_user(
            **validated_data,
            referred_by=referred_by
        )
        return user


class InvestmentPackSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvestmentPack
        fields = '__all__'


class UserInvestmentSerializer(serializers.ModelSerializer):
    pack = InvestmentPackSerializer(read_only=True)
    days_elapsed = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = UserInvestment
        fields = '__all__'
        read_only_fields = ['user', 'start_date', 'end_date', 'daily_return', 'total_return']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ['user', 'status', 'transaction_hash', 'created_at', 'updated_at']


class ReferralPackSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferralPack
        fields = '__all__'


class ReferralSerializer(serializers.ModelSerializer):
    referred_user = UserSerializer(read_only=True)
    
    class Meta:
        model = ReferralCommission
        fields = ['id', 'referred_user', 'amount', 'created_at']


class KYCVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = KYCVerification
        fields = '__all__'
        read_only_fields = ['user', 'status', 'admin_note', 'reviewed_at']


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    recipient = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = '__all__'
        read_only_fields = ['sender', 'created_at']
```

---

## Views

### api/views.py (Part 1 - Authentication)

```python
from rest_framework import status, generics, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.db.models import Sum, Count, Q
from django.utils import timezone
from datetime import timedelta, date

from .models import *
from .serializers import *

User = get_user_model()


# Authentication Views
@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    """User registration"""
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'Registration successful. Please check your email to verify your account.'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """User login"""
    from django.contrib.auth import authenticate
    
    email = request.data.get('email')
    password = request.data.get('password')
    
    user = authenticate(username=email, password=password)
    if not user:
        # Try with username field
        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(username=user_obj.username, password=password)
        except User.DoesNotExist:
            pass
    
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UserSerializer(user).data
        })
    
    return Response({
        'detail': 'Invalid credentials'
    }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """User logout"""
    return Response({'message': 'Logged out successfully'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile_view(request):
    """Get user profile"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_profile_view(request):
    """Update user profile"""
    serializer = UserSerializer(request.user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

Continue in next response...

---

## URLs

### api/urls.py

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

router = DefaultRouter()
# Add viewsets to router here

urlpatterns = [
    # Authentication
    path('auth/signup/', views.signup_view),
    path('auth/login/', views.login_view),
    path('auth/logout/', views.logout_view),
    path('auth/token/refresh/', TokenRefreshView.as_view()),
    
    # User
    path('users/profile/', views.user_profile_view),
    path('users/profile/update/', views.update_profile_view),
    path('users/stats/', views.user_stats_view),
    
    # Add other URL patterns...
    
    path('', include(router.urls)),
]
```

### Main urls.py

```python
# investment_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

---

## Environment Variables

Create `.env` file in Django project root:

```
# .env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=sqlite:///db.sqlite3

# Email configuration (for verification emails)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

## Running the Backend

```bash
# Make migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (admin)
python manage.py createsuperuser

# Run server
python manage.py runserver
```

---

## React Frontend Configuration

Create `.env` file in React project root:

```
# .env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## Next Steps

1. Implement all view functions
2. Set up email verification
3. Configure production settings
4. Set up proper database (PostgreSQL recommended)
5. Configure file storage for KYC documents (AWS S3 recommended)
6. Add Celery for scheduled tasks (daily earnings calculation)
7. Implement proper error logging
8. Add rate limiting
9. Set up monitoring

---

## Testing the Integration

1. Start Django backend: `python manage.py runserver`
2. Start React frontend: `npm run dev`
3. Test authentication flow
4. Test API endpoints with Postman
5. Check CORS configuration
6. Verify JWT token refresh

