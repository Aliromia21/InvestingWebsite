# 🚀 Investment Platform - Quick Startup Guide

This guide will get your investment platform up and running in 10 minutes!

## 📋 Prerequisites

- Python 3.8+ installed
- Node.js 16+ installed
- Code editor (VS Code recommended)

## 🔥 Quick Start (Copy & Paste)

### Step 1: Backend Setup (5 minutes)

Open a terminal and run these commands:

```bash
# Navigate to backend folder
cd django_backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create admin account (follow prompts)
python manage.py createsuperuser

# Setup initial data (investment & referral packs)
python setup_initial_data.py

# Start Django server
python manage.py runserver
```

✅ Backend is now running at `http://localhost:8000`

### Step 2: Frontend Setup (2 minutes)

Open a NEW terminal and run:

```bash
# Go to project root
cd ..

# Create frontend environment file
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env

# Install dependencies (if needed)
npm install

# Start React dev server
npm run dev
```

✅ Frontend is now running at `http://localhost:5173`

### Step 3: Test It! (3 minutes)

1. **Open browser:** `http://localhost:5173`

2. **Register an account:**
   - Click "Sign Up"
   - Fill in the form
   - Submit

3. **Login:**
   - Use your credentials
   - You'll see the dashboard

4. **Test admin panel:**
   - Go to `http://localhost:8000/admin/`
   - Login with superuser credentials
   - View all data

## 🎯 What Just Happened?

### Backend Created:
- ✅ SQLite database with all tables
- ✅ 4 Investment Packs (Starter, Professional, Premium, Elite)
- ✅ 4 Referral Packs (Bronze, Silver, Gold, VIP)
- ✅ Admin account
- ✅ REST API running

### Frontend Connected:
- ✅ React app with all components
- ✅ API services configured
- ✅ Authentication system
- ✅ All features ready

## 📱 Available Features

### For Customers:
1. **Authentication**
   - Sign up with optional referral code
   - Login/Logout
   - Email verification (configured)
   - Password reset

2. **Dashboard**
   - Balance overview
   - Active investments
   - Total earnings
   - Referral statistics

3. **Investments**
   - View 4 investment packs
   - Create investments
   - Track returns
   - View history

4. **Transactions**
   - Deposit USDT (pending approval)
   - Withdraw funds
   - Transaction history

5. **Referrals**
   - Personal referral code
   - 3% commission on referrals
   - Milestone rewards
   - Track referrals

6. **KYC Verification**
   - Upload ID documents
   - Submit selfie
   - Track status

7. **Messages**
   - Communicate with admin
   - Receive custom offers
   - Submit platform links

### For Admins:
1. **Dashboard**
   - Platform statistics
   - User overview
   - Pending requests

2. **User Management**
   - View all users
   - Edit user details
   - Delete users
   - Adjust balances

3. **Transaction Management**
   - Approve/Reject deposits
   - Approve/Reject withdrawals
   - Add admin notes

4. **KYC Management**
   - Review documents
   - Approve/Reject submissions
   - Add verification notes

5. **Investment Management**
   - View all investments
   - Monitor platform activity

6. **Messaging System**
   - Send custom offers
   - Review submitted links
   - Approve/Reject links

7. **Affiliate Management**
   - Track referrals
   - View commission stats

## 🔐 Default Admin Access

**Django Admin Panel:** `http://localhost:8000/admin/`
- Username: (what you entered in createsuperuser)
- Password: (what you entered in createsuperuser)

**Platform Admin:** Use same credentials to login at `http://localhost:5173`
- You'll see the admin dashboard

## 💰 Investment Packs

| Pack | Min Amount | Max Amount | Daily Return | Duration |
|------|-----------|-----------|--------------|----------|
| Starter | $100 | $4,999 | 2.5% | 60 days |
| Professional | $5,000 | $19,999 | 5.0% | 60 days |
| Premium | $20,000 | $49,999 | 8.5% | 60 days |
| Elite | $50,000+ | Unlimited | 12.5% | 60 days |

## 🎁 Referral Packs

| Pack | Required Referrals | Reward |
|------|-------------------|---------|
| Bronze | 5 | $25 |
| Silver | 10 | $50 |
| Gold | 20 | $150 |
| VIP | 40 | $1,000 |

Plus 3% commission on every referral investment!

## 🧪 Testing Workflow

### Test Customer Flow:

1. **Register:**
   - Sign up as new user
   - Note your referral code

2. **Add Balance:**
   - Go to Transactions
   - Create a deposit request
   - Login as admin
   - Approve the deposit
   - Logout and login as customer
   - Check balance updated

3. **Create Investment:**
   - Go to Investment Packs
   - Choose a pack
   - Enter amount
   - Submit
   - View in My Investments

4. **Test Referrals:**
   - Copy your referral code
   - Sign up another account with your code
   - Make investment as new user
   - Check original user got 3% commission

5. **Submit KYC:**
   - Go to Identity Verification
   - Upload documents
   - Submit
   - Login as admin to approve

6. **Test Withdrawal:**
   - Request withdrawal
   - Admin approves
   - Balance reduces

### Test Admin Flow:

1. **Login as admin** (use superuser credentials)

2. **View Dashboard:**
   - See platform statistics
   - Recent users
   - Pending items

3. **Manage Deposits:**
   - View pending deposits
   - Approve with admin note
   - User balance increases

4. **Manage KYC:**
   - View submissions
   - Review documents
   - Approve/Reject

5. **Send Custom Offer:**
   - Go to Messages
   - Send offer to specific user
   - User can submit platform link
   - Review and approve/reject link

## 📂 Important Files

### Backend:
- `django_backend/api/models.py` - Database models
- `django_backend/api/views.py` - API endpoints
- `django_backend/api/urls.py` - URL routing
- `django_backend/investment_backend/settings.py` - Configuration

### Frontend:
- `/services/` - API service layer
- `/hooks/` - React hooks
- `/types/api.ts` - TypeScript interfaces
- `/config/api.config.ts` - API configuration
- `/components/` - React components

### Documentation:
- `/DJANGO_INTEGRATION_COMPLETE.md` - Full integration guide
- `/django_backend/README.md` - Backend documentation
- `/API_INTEGRATION_EXAMPLES.md` - API usage examples

## 🛠️ Common Commands

### Backend:

```bash
# Activate virtual environment
cd django_backend
source venv/bin/activate  # or venv\Scripts\activate

# Run server
python manage.py runserver

# Create migrations (after model changes)
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Django shell
python manage.py shell

# Collect static files (production)
python manage.py collectstatic
```

### Frontend:

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐛 Troubleshooting

### Backend won't start:
```bash
cd django_backend
pip install -r requirements.txt
python manage.py migrate
```

### Frontend won't start:
```bash
npm install
npm run dev
```

### CORS errors:
Check `.env` files have correct URLs:
- Backend: `CORS_ALLOWED_ORIGINS=http://localhost:5173`
- Frontend: `VITE_API_BASE_URL=http://localhost:8000/api`

### Database errors:
```bash
cd django_backend
rm db.sqlite3
python manage.py migrate
python setup_initial_data.py
python manage.py createsuperuser
```

### Can't login:
- Clear browser localStorage
- Check credentials
- Verify user exists in Django admin

## 📊 Database Access

### Django Admin Panel:
`http://localhost:8000/admin/`
- Full database access
- User management
- Direct data editing

### Django Shell:
```bash
cd django_backend
python manage.py shell
```

```python
from api.models import User, InvestmentPack, Transaction

# List all users
User.objects.all()

# Get user by email
user = User.objects.get(email='test@example.com')

# Update balance
user.balance = 1000
user.save()

# View investment packs
InvestmentPack.objects.all()
```

## 🚀 Next Steps

1. **Customize:**
   - Modify investment pack rates
   - Adjust referral rewards
   - Customize email templates

2. **Add Features:**
   - Email notifications
   - SMS verification
   - Payment gateway integration

3. **Deploy:**
   - Set up PostgreSQL
   - Configure production settings
   - Deploy backend (Heroku, DigitalOcean, AWS)
   - Deploy frontend (Vercel, Netlify)

4. **Secure:**
   - Change SECRET_KEY
   - Set DEBUG=False
   - Configure HTTPS
   - Set up proper CORS

## 📞 Support

If you encounter issues:

1. Check the logs in both terminals
2. Review `/DJANGO_INTEGRATION_COMPLETE.md`
3. Check Django admin panel for data
4. Clear browser cache/localStorage
5. Restart both servers

## ✅ Success Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] Admin account created
- [ ] Can access Django admin panel
- [ ] Can register new user
- [ ] Can login to platform
- [ ] Dashboard displays correctly
- [ ] Investment packs visible
- [ ] Can create deposit request
- [ ] Admin can approve transactions
- [ ] Referral system works
- [ ] KYC submission works

## 🎉 You're All Set!

Your investment platform is now fully functional with:
- ✅ Complete Django REST API backend
- ✅ Full-featured React frontend
- ✅ JWT authentication
- ✅ Investment system
- ✅ Referral program
- ✅ Admin dashboard
- ✅ Transaction management
- ✅ KYC verification
- ✅ Messaging system
- ✅ Multi-language support

Happy investing! 💰
