# Complete Django-React Integration Guide

## Overview

Your investment platform is now fully integrated with Django backend! This document provides complete instructions for running both the frontend and backend together.

## Project Structure

```
/
├── django_backend/                 # Django REST API Backend
│   ├── api/                       # Main API app
│   │   ├── models.py             # Database models
│   │   ├── views.py              # API endpoints
│   │   ├── serializers.py        # Data serializers
│   │   ├── urls.py               # API routes
│   │   └── admin.py              # Admin panel config
│   ├── investment_backend/        # Django project settings
│   │   ├── settings.py           # Configuration
│   │   ├── urls.py               # Root URLs
│   │   └── wsgi.py               # WSGI config
│   ├── manage.py                  # Django management
│   ├── requirements.txt           # Python dependencies
│   └── README.md                  # Backend documentation
│
├── services/                      # React API services (READY)
│   ├── api.service.ts            # Core API client
│   ├── auth.service.ts           # Authentication
│   ├── investment.service.ts     # Investments
│   ├── transaction.service.ts    # Transactions
│   ├── referral.service.ts       # Referrals
│   ├── kyc.service.ts            # KYC
│   ├── message.service.ts        # Messages
│   ├── dashboard.service.ts      # Dashboard stats
│   └── admin.service.ts          # Admin operations
│
├── hooks/                         # React hooks (READY)
│   ├── useAuth.ts                # Authentication hook
│   └── useApi.ts                 # API call hook
│
├── config/                        # Configuration (READY)
│   └── api.config.ts             # API endpoints
│
├── types/                         # TypeScript types (READY)
│   └── api.ts                    # API interfaces
│
└── components/                    # React components (READY)
    ├── LandingPage.tsx
    ├── LoginPage.tsx
    ├── SignupPage.tsx
    ├── Dashboard.tsx
    └── ... (all other components)
```

## Quick Start Guide

### Step 1: Backend Setup

```bash
# Navigate to Django backend
cd django_backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and set SECRET_KEY (important!)
# On Linux/Mac:
nano .env
# On Windows:
notepad .env

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser
# Enter: username, email, password

# Start Django server
python manage.py runserver
```

The backend will run at `http://localhost:8000`

### Step 2: Create Initial Data

```bash
# Open Django shell
python manage.py shell
```

```python
from api.models import InvestmentPack, ReferralPack

# Create Investment Packs
InvestmentPack.objects.create(
    name='Starter',
    min_amount=100,
    max_amount=4999,
    daily_return_rate=2.5,
    duration_days=60
)

InvestmentPack.objects.create(
    name='Professional',
    min_amount=5000,
    max_amount=19999,
    daily_return_rate=5.0,
    duration_days=60
)

InvestmentPack.objects.create(
    name='Premium',
    min_amount=20000,
    max_amount=49999,
    daily_return_rate=8.5,
    duration_days=60
)

InvestmentPack.objects.create(
    name='Elite',
    min_amount=50000,
    max_amount=999999999,
    daily_return_rate=12.5,
    duration_days=60
)

# Create Referral Packs
ReferralPack.objects.create(
    name='Bronze',
    required_referrals=5,
    reward_amount=25,
    icon='bronze'
)

ReferralPack.objects.create(
    name='Silver',
    required_referrals=10,
    reward_amount=50,
    icon='silver'
)

ReferralPack.objects.create(
    name='Gold',
    required_referrals=20,
    reward_amount=150,
    icon='gold'
)

ReferralPack.objects.create(
    name='VIP',
    required_referrals=40,
    reward_amount=1000,
    icon='vip'
)

exit()
```

### Step 3: Frontend Setup

```bash
# In a NEW terminal, navigate to project root
cd ..

# Create .env file if not exists
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env

# Install dependencies (if needed)
npm install

# Start React development server
npm run dev
```

The frontend will run at `http://localhost:5173`

## Running Both Servers

You need TWO terminal windows:

**Terminal 1 - Django Backend:**
```bash
cd django_backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python manage.py runserver
```

**Terminal 2 - React Frontend:**
```bash
npm run dev
```

## Testing the Integration

### 1. Create a Test Account

1. Open browser: `http://localhost:5173`
2. Click "Sign Up"
3. Fill in registration form
4. Submit

### 2. Login

1. Go to login page
2. Enter credentials
3. You should be redirected to dashboard

### 3. Test Features

**Customer Features:**
- View dashboard with stats
- Browse investment packs
- Make deposits (create pending transaction)
- View referral code
- Submit KYC documents
- Send messages to admin

**Admin Features:**
1. Login as admin (use superuser credentials)
2. Access admin dashboard
3. Approve/reject deposits
4. Approve/reject withdrawals
5. Manage KYC submissions
6. Send custom offers to users
7. View all users and statistics

## API Endpoints Reference

### Authentication
- `POST /api/auth/signup/` - Register new user
- `POST /api/auth/login/` - Login
- `POST /api/auth/logout/` - Logout
- `POST /api/auth/token/refresh/` - Refresh JWT token

### User
- `GET /api/users/profile/` - Get user profile
- `PATCH /api/users/profile/update/` - Update profile
- `GET /api/users/stats/` - Get dashboard stats

### Investments
- `GET /api/investments/packs/` - Get all packs
- `GET /api/investments/my-investments/` - User's investments
- `POST /api/investments/create/` - Create investment
- `GET /api/investments/chart-data/` - Chart data

### Transactions
- `GET /api/transactions/` - Get transactions
- `POST /api/transactions/deposit/` - Create deposit
- `POST /api/transactions/withdraw/` - Create withdrawal

### Referrals
- `GET /api/referrals/stats/` - Referral stats
- `GET /api/referrals/packs/` - Referral packs
- `GET /api/referrals/my-referrals/` - My referrals

### KYC
- `POST /api/kyc/submit/` - Submit KYC
- `GET /api/kyc/status/` - KYC status

### Messages
- `GET /api/messages/` - Get messages
- `POST /api/messages/send/` - Send message
- `POST /api/messages/mark-read/` - Mark as read
- `POST /api/messages/submit-link/` - Submit offer link

### Admin (requires admin role)
- `GET /api/admin/stats/` - Admin statistics
- `GET /api/admin/users/` - All users
- `GET /api/admin/deposits/` - All deposits
- `GET /api/admin/withdrawals/` - All withdrawals
- `GET /api/admin/kyc/` - All KYC submissions
- `POST /api/admin/transactions/approve/` - Approve transaction
- `POST /api/admin/transactions/reject/` - Reject transaction
- `POST /api/admin/kyc/approve/` - Approve KYC
- `POST /api/admin/kyc/reject/` - Reject KYC

## Frontend Service Usage Examples

### Using Authentication Service

```typescript
import { authService } from './services/auth.service';

// Signup
await authService.signup({
  email: 'user@example.com',
  username: 'username',
  password: 'password123',
  password_confirm: 'password123',
  first_name: 'John',
  last_name: 'Doe',
  referral_code: 'ABC12345' // optional
});

// Login
const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});
console.log(response.user);

// Get profile
const user = await authService.getProfile();
```

### Using Investment Service

```typescript
import { investmentService } from './services/investment.service';

// Get packs
const packs = await investmentService.getInvestmentPacks();

// Create investment
await investmentService.createInvestment({
  pack_id: 1,
  amount: 1000
});

// Get my investments
const investments = await investmentService.getMyInvestments();
```

### Using Transaction Service

```typescript
import { transactionService } from './services/transaction.service';

// Create deposit
await transactionService.createDeposit({
  amount: 1000,
  wallet_address: '0x...',
  transaction_hash: '0x...'
});

// Create withdrawal
await transactionService.createWithdrawal({
  amount: 500,
  wallet_address: '0x...'
});
```

## Environment Variables

### Backend (.env in django_backend/)
```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend (.env in project root)
```
VITE_API_BASE_URL=http://localhost:8000/api
```

## Common Issues & Solutions

### Issue: CORS Errors

**Solution:** Ensure Django backend has correct CORS settings:
```python
# In django_backend/investment_backend/settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]
```

### Issue: 401 Unauthorized

**Solution:** 
- Check if token is valid
- Frontend automatically refreshes tokens
- Clear localStorage and login again

### Issue: Database Not Found

**Solution:**
```bash
cd django_backend
python manage.py migrate
```

### Issue: Module Not Found

**Solution:**
```bash
# Backend
cd django_backend
pip install -r requirements.txt

# Frontend
npm install
```

## Admin Panel Access

Django Admin: `http://localhost:8000/admin/`
- Use superuser credentials
- Manage all data directly
- View all database records

## Data Flow Example

### User Registration Flow
1. User fills signup form in React
2. React calls `authService.signup()`
3. API service sends POST to `/api/auth/signup/`
4. Django creates User with referral code
5. Returns success message
6. React redirects to login

### Investment Creation Flow
1. User selects pack and amount
2. React calls `investmentService.createInvestment()`
3. API sends POST to `/api/investments/create/`
4. Django validates amount and balance
5. Creates UserInvestment record
6. Deducts balance
7. Processes referral commission if applicable
8. Returns investment details
9. React updates UI

### Admin Approval Flow
1. Admin views pending deposits
2. Clicks approve
3. React calls `adminService.approveTransaction()`
4. API sends POST to `/api/admin/transactions/approve/`
5. Django updates transaction status
6. Adds amount to user balance
7. Returns updated transaction
8. React updates list

## Database Models

### User
- Custom Django user with investment fields
- Automatic referral code generation
- Balance tracking
- Role-based access

### InvestmentPack
- 4 packs: Starter, Professional, Premium, Elite
- Configurable return rates and amounts

### UserInvestment
- Links user to investment pack
- Tracks returns and duration
- Auto-calculates daily returns

### Transaction
- All money movements
- Status workflow: pending → approved/rejected
- Admin notes

### ReferralCommission
- 3% automatic commission
- Tracks referrer and referred user

### ReferralPack
- Milestone rewards: Bronze, Silver, Gold, VIP
- Automatic achievement tracking

### KYCVerification
- Document upload (ID front, back, selfie)
- Review workflow
- Admin approval/rejection

### Message
- User ↔ Admin communication
- Offer platform integration
- Link submission and approval

## Production Deployment

### Backend

1. **Use PostgreSQL:**
```bash
pip install psycopg2-binary
# Update settings.py with PostgreSQL config
```

2. **Security Settings:**
```python
DEBUG = False
SECRET_KEY = 'strong-random-key'
ALLOWED_HOSTS = ['yourdomain.com']
```

3. **Collect Static Files:**
```bash
python manage.py collectstatic
```

4. **Use Gunicorn:**
```bash
pip install gunicorn
gunicorn investment_backend.wsgi:application
```

### Frontend

1. **Build:**
```bash
npm run build
```

2. **Deploy dist/ folder** to your hosting service

3. **Update environment:**
```
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

## Monitoring & Maintenance

### Daily Tasks
- Check pending transactions
- Review KYC submissions
- Monitor user signups

### Automated Tasks (Recommended)
Set up Celery for:
- Daily earnings calculation
- Referral pack achievement notifications
- Email notifications

## Support & Documentation

- **Backend README:** `/django_backend/README.md`
- **API Integration Guide:** `/API_INTEGRATION_EXAMPLES.md`
- **Backend Guide:** `/DJANGO_BACKEND_GUIDE.md`
- **Django Docs:** https://docs.djangoproject.com/
- **DRF Docs:** https://www.django-rest-framework.org/

## Next Steps

1. ✅ Start both servers
2. ✅ Create admin account
3. ✅ Add investment & referral packs
4. ✅ Test signup/login flow
5. ✅ Test investment creation
6. ✅ Test admin approval workflow
7. 🔄 Customize email templates
8. 🔄 Add automated tasks
9. 🔄 Deploy to production
10. 🔄 Set up monitoring

## Success Checklist

- [ ] Django server running on port 8000
- [ ] React server running on port 5173
- [ ] Database migrated
- [ ] Admin user created
- [ ] Investment packs created
- [ ] Referral packs created
- [ ] Can register new user
- [ ] Can login
- [ ] Dashboard loads correctly
- [ ] Can view investment packs
- [ ] Can create investments
- [ ] Admin can approve transactions
- [ ] KYC submission works
- [ ] Messaging system works

Your investment platform is now fully functional with Django backend! 🎉
