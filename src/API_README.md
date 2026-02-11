# Django Backend API Integration

Complete guide for integrating the React frontend with Django REST API backend.

## 📋 Overview

This project now includes a complete API service layer that connects the React frontend to a Django REST API backend. The integration includes:

- ✅ JWT-based authentication
- ✅ Type-safe API calls with TypeScript
- ✅ Automatic token refresh
- ✅ Error handling and loading states
- ✅ File upload support (KYC documents)
- ✅ Real-time data synchronization

## 🗂️ Project Structure

```
/
├── services/              # API Service Layer
│   ├── api.service.ts           # Core API client
│   ├── auth.service.ts          # Authentication
│   ├── investment.service.ts    # Investments
│   ├── transaction.service.ts   # Transactions
│   ├── referral.service.ts      # Referrals
│   ├── kyc.service.ts           # KYC verification
│   ├── message.service.ts       # Messaging
│   ├── admin.service.ts         # Admin operations
│   └── dashboard.service.ts     # Dashboard stats
│
├── types/                 # TypeScript Definitions
│   └── api.ts                   # API types & interfaces
│
├── config/                # Configuration
│   └── api.config.ts            # API endpoints & settings
│
├── hooks/                 # Custom React Hooks
│   ├── useAuth.ts               # Authentication hook
│   └── useApi.ts                # Generic API hook
│
└── .env                   # Environment variables
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Environment

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 3. Start Django Backend

See [DJANGO_BACKEND_GUIDE.md](./DJANGO_BACKEND_GUIDE.md) for complete backend setup.

```bash
cd backend
python manage.py runserver
```

### 4. Start React Frontend

```bash
npm run dev
```

## 🔐 Authentication

### How It Works

1. User logs in with email/password
2. Backend returns JWT access & refresh tokens
3. Tokens stored in localStorage
4. Access token included in all API requests
5. Automatic token refresh when expired

### Example Usage

```tsx
import { useAuth } from './hooks/useAuth';

function LoginComponent() {
  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
      // Navigate to dashboard
    } catch (err) {
      // Error handling
    }
  };

  return (
    // Your login form
  );
}
```

## 📡 API Services

### Authentication Service

```tsx
import { authService } from './services/auth.service';

// Login
await authService.login({ email, password });

// Signup
await authService.signup({ email, username, password, ... });

// Logout
await authService.logout();

// Get profile
const user = await authService.getProfile();

// Update profile
await authService.updateProfile({ first_name, last_name });
```

### Investment Service

```tsx
import { investmentService } from './services/investment.service';

// Get investment packs
const packs = await investmentService.getInvestmentPacks();

// Get user's investments
const investments = await investmentService.getUserInvestments();

// Create investment
await investmentService.createInvestment(packId, amount);

// Get chart data
const chartData = await investmentService.getChartData(investmentId, '30d');
```

### Transaction Service

```tsx
import { transactionService } from './services/transaction.service';

// Get transactions
const transactions = await transactionService.getTransactions(page, type, status);

// Create deposit
await transactionService.createDeposit(amount, walletAddress);

// Create withdrawal
await transactionService.createWithdrawal(amount, walletAddress);
```

### Referral Service

```tsx
import { referralService } from './services/referral.service';

// Get referral code
const { referral_code } = await referralService.getReferralCode();

// Get referral stats
const stats = await referralService.getReferralStats();
```

### KYC Service

```tsx
import { kycService } from './services/kyc.service';

// Submit KYC
await kycService.submitKYC({
  full_name,
  date_of_birth,
  country,
  id_type,
  id_number,
  id_front_image: file1,
  id_back_image: file2,
  selfie_image: file3,
});

// Get KYC status
const kyc = await kycService.getKYCStatus();
```

### Admin Service

```tsx
import { adminService } from './services/admin.service';

// Get admin stats
const stats = await adminService.getAdminStats();

// Get users
const users = await adminService.getUsers(page, search);

// Approve deposit
await adminService.approveDeposit(transactionId, transactionHash);

// Approve KYC
await adminService.approveKYC(kycId, note);

// Send custom offer
await adminService.sendCustomOffer(userId, subject, message, platform);
```

## 🎣 Custom Hooks

### useAuth Hook

Manages authentication state across the application.

```tsx
import { useAuth } from './hooks/useAuth';

function Component() {
  const { 
    user,              // Current user object
    loading,           // Loading state
    error,             // Error message
    isAuthenticated,   // Boolean
    login,             // Login function
    signup,            // Signup function
    logout,            // Logout function
    updateUser,        // Update user state
    loadUser,          // Reload user data
  } = useAuth();

  return (
    // Your component
  );
}
```

### useApi Hook

Generic hook for API calls with loading and error states.

```tsx
import { useApi } from './hooks/useApi';
import { investmentService } from './services/investment.service';

function Component() {
  const { 
    data,       // Response data
    loading,    // Loading state
    error,      // Error message
    execute,    // Function to execute API call
    reset,      // Reset state
  } = useApi(investmentService.getInvestmentPacks);

  useEffect(() => {
    execute();
  }, []);

  return (
    // Your component
  );
}
```

## 🔄 Data Flow

### Customer Dashboard Flow

```
1. User logs in
   ↓
2. JWT tokens stored in localStorage
   ↓
3. App.tsx checks authentication
   ↓
4. CustomerApp loads
   ↓
5. Dashboard fetches user stats
   ↓
6. All API calls include JWT token
   ↓
7. Auto-refresh token if expired
```

### Investment Flow

```
1. User views investment packs
   ↓
2. Frontend fetches packs from API
   ↓
3. User selects pack and enters amount
   ↓
4. Frontend validates against pack limits
   ↓
5. API call creates investment
   ↓
6. Backend deducts from balance
   ↓
7. Backend creates investment record
   ↓
8. Frontend updates UI
```

### Admin Approval Flow

```
1. Admin views pending requests
   ↓
2. Frontend fetches from admin endpoint
   ↓
3. Admin clicks approve/reject
   ↓
4. API call with admin token
   ↓
5. Backend validates admin permission
   ↓
6. Backend updates request status
   ↓
7. Backend updates user balance (if deposit)
   ↓
8. Frontend refreshes list
```

## 🛡️ Error Handling

### Automatic Retry

The API service automatically retries requests when the access token expires:

```
1. API request with expired token
   ↓
2. Receives 401 Unauthorized
   ↓
3. Attempts token refresh
   ↓
4. If successful: Retry original request
   ↓
5. If failed: Redirect to login
```

### Error Display

```tsx
const { error } = useApi(apiFunction);

{error && (
  <div className="bg-red-500/20 border border-red-500 rounded p-3 text-red-200">
    {error}
  </div>
)}
```

## 📝 TypeScript Types

All API types are defined in `/types/api.ts`:

```tsx
import type { 
  User,
  InvestmentPack,
  UserInvestment,
  Transaction,
  Referral,
  KYCVerification,
  Message,
  DashboardStats,
  AdminStats,
} from './types/api';
```

## 🔒 Security Features

1. **JWT Authentication**: Secure token-based auth
2. **Automatic Token Refresh**: Seamless user experience
3. **HTTP-only Cookies** (optional): Enhanced security
4. **CORS Protection**: Controlled origin access
5. **Request Timeout**: Prevents hanging requests
6. **Input Validation**: Both frontend and backend

## 🧪 Testing API Integration

### 1. Test Authentication

```tsx
// Login test
const response = await authService.login({
  email: 'test@example.com',
  password: 'password123'
});

console.log('User:', response.user);
console.log('Token:', response.access);
```

### 2. Test API Calls

```tsx
// Investment packs test
const packs = await investmentService.getInvestmentPacks();
console.log('Packs:', packs);

// Dashboard stats test
const stats = await dashboardService.getUserStats();
console.log('Stats:', stats);
```

### 3. Test Error Handling

```tsx
try {
  await authService.login({ 
    email: 'wrong@example.com', 
    password: 'wrong' 
  });
} catch (error) {
  console.log('Error caught:', error.message);
}
```

## 🔧 Development vs Production

### Development

```env
# .env.development
VITE_API_BASE_URL=http://localhost:8000/api
```

### Production

```env
# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

## 📚 Additional Resources

- [DJANGO_BACKEND_GUIDE.md](./DJANGO_BACKEND_GUIDE.md) - Complete Django setup
- [API_INTEGRATION_EXAMPLES.md](./API_INTEGRATION_EXAMPLES.md) - Code examples
- [PLATFORM_GUIDE.md](./PLATFORM_GUIDE.md) - Platform overview

## 🐛 Troubleshooting

### CORS Errors

**Problem**: Requests blocked by CORS policy

**Solution**: Check Django `CORS_ALLOWED_ORIGINS` in settings.py

### 401 Unauthorized

**Problem**: API returns 401 even after login

**Solution**: Check token storage and Authorization header

### Token Refresh Loop

**Problem**: Infinite refresh attempts

**Solution**: Check refresh token validity and expiration

### Network Errors

**Problem**: Requests timeout or fail

**Solution**: 
- Check Django backend is running
- Verify API_BASE_URL in .env
- Check network connectivity

## 📞 API Endpoints Reference

See `config/api.config.ts` for complete endpoint list:

- Authentication: `/auth/*`
- User Management: `/users/*`
- Investments: `/investments/*`
- Transactions: `/transactions/*`
- Referrals: `/referrals/*`
- KYC: `/kyc/*`
- Messages: `/messages/*`
- Admin: `/admin/*`

## ✅ Next Steps

1. ✅ Set up Django backend (see DJANGO_BACKEND_GUIDE.md)
2. ✅ Configure environment variables
3. ✅ Test authentication flow
4. ✅ Update components to use real API data
5. ✅ Implement error boundaries
6. ✅ Add loading skeletons
7. ✅ Set up production environment
8. ✅ Deploy backend and frontend

---

**Need help?** Check the example implementations in [API_INTEGRATION_EXAMPLES.md](./API_INTEGRATION_EXAMPLES.md)
