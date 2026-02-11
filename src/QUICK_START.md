# ⚡ Quick Start - Investment Platform

## 🚀 Start Development (2 Terminals)

### Terminal 1 - Django Backend
```bash
cd django_backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python manage.py runserver
```
**Running at:** http://localhost:8000

### Terminal 2 - React Frontend
```bash
npm run dev
```
**Running at:** http://localhost:5173

---

## 🆕 First Time Setup

### 1. Backend Setup
```bash
cd django_backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python setup_initial_data.py
python manage.py createsuperuser
python manage.py runserver
```

### 2. Frontend Setup
```bash
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env
npm install
npm run dev
```

---

## 🔑 Access Points

| Service | URL | Credentials |
|---------|-----|-------------|
| React App | http://localhost:5173 | Create via signup |
| Django API | http://localhost:8000/api | N/A |
| Admin Panel | http://localhost:8000/admin | Superuser creds |

---

## 📊 Initial Data Created

### Investment Packs
- ✅ Starter (2.5% daily, $100-$4,999)
- ✅ Professional (5.0% daily, $5,000-$19,999)
- ✅ Premium (8.5% daily, $20,000-$49,999)
- ✅ Elite (12.5% daily, $50,000+)

### Referral Packs
- ✅ Bronze (5 refs, $25)
- ✅ Silver (10 refs, $50)
- ✅ Gold (20 refs, $150)
- ✅ VIP (40 refs, $1,000)

---

## 🧪 Quick Test

1. **Open:** http://localhost:5173
2. **Sign Up** → Create account
3. **Login** → Access dashboard
4. **Admin Login** → Use superuser at http://localhost:8000/admin

---

## 🛠️ Common Commands

### Backend
```bash
# Start server
python manage.py runserver

# Make migrations
python manage.py makemigrations
python manage.py migrate

# Create admin
python manage.py createsuperuser

# Django shell
python manage.py shell

# Reset DB (careful!)
rm db.sqlite3
python manage.py migrate
python setup_initial_data.py
```

### Frontend
```bash
# Start dev server
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

---

## 📝 API Endpoints (Quick Reference)

### Auth
- POST `/api/auth/signup/` - Register
- POST `/api/auth/login/` - Login
- POST `/api/auth/token/refresh/` - Refresh token

### User
- GET `/api/users/profile/` - Get profile
- GET `/api/users/stats/` - Dashboard stats

### Investments
- GET `/api/investments/packs/` - Get packs
- POST `/api/investments/create/` - Create investment

### Transactions
- POST `/api/transactions/deposit/` - Deposit
- POST `/api/transactions/withdraw/` - Withdraw

### Admin
- GET `/api/admin/stats/` - Admin stats
- POST `/api/admin/transactions/approve/` - Approve
- POST `/api/admin/kyc/approve/` - Approve KYC

---

## 🐛 Quick Troubleshooting

### Backend won't start
```bash
cd django_backend
pip install -r requirements.txt
python manage.py migrate
```

### Frontend won't start
```bash
npm install
```

### Can't login
- Clear browser localStorage
- Check credentials in admin panel
- Verify user exists

### CORS errors
Check both `.env` files have correct URLs

---

## 📚 Full Documentation

- `/STARTUP_GUIDE.md` - Complete setup guide
- `/DJANGO_INTEGRATION_COMPLETE.md` - Integration details
- `/FINAL_INTEGRATION_SUMMARY.md` - Feature summary
- `/django_backend/README.md` - Backend docs

---

## ✅ Success Checklist

- [ ] Backend running on :8000
- [ ] Frontend running on :5173
- [ ] Can register user
- [ ] Can login
- [ ] Dashboard loads
- [ ] Investment packs show
- [ ] Admin panel accessible

---

## 🎯 Your Platform Has

✅ 50+ API endpoints  
✅ 8 database models  
✅ JWT authentication  
✅ Investment system  
✅ Referral program  
✅ Admin dashboard  
✅ KYC verification  
✅ Messaging system  

**Ready to launch! 🚀**
