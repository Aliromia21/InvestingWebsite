# Figma Access Guide

## Project Structure

The InvestPro platform has been organized into separate, independently accessible components for Figma. You can now access each interface separately.

## Main Entry Points

### 1. App.tsx (Main Selector)
- **Purpose**: Central navigation hub
- **Shows**: Overview of all three major sections
- **Use**: Start here to understand the platform structure

### 2. LandingPageApp.tsx (Public Website & Auth)
- **Purpose**: Public-facing pages and authentication flows
- **Includes**:
  - Landing page with features and contact
  - Login page
  - Signup page with validation
  - Email verification (OTP)
  - Identity verification (KYC upload)
  - Forgot password flow

### 3. CustomerApp.tsx (Customer Dashboard)
- **Purpose**: Complete customer experience
- **Includes**:
  - Dashboard overview
  - Investment packs selection
  - Deposit & withdrawal system
  - Referral program
  - Transaction history

### 4. AdminApp.tsx (Admin Dashboard)
- **Purpose**: Platform management
- **Includes**:
  - Complete admin dashboard with 6 tabs
  - User management
  - KYC verification
  - Deposit approvals
  - Withdrawal processing
  - Investment tracking
  - Affiliate program overview

## Individual Page Components

All pages are also available as standalone components in the `/pages` folder:

### Landing & Auth Pages
- `pages/Landing.tsx` - Main landing page
- `pages/Login.tsx` - Login form
- `pages/Signup.tsx` - Registration form
- `pages/EmailVerify.tsx` - Email OTP verification
- `pages/IdentityVerify.tsx` - KYC document upload
- `pages/ForgotPass.tsx` - Password reset flow

### Customer Pages
- `pages/CustomerDashboard.tsx` - Main dashboard
- `pages/InvestmentPacksPage.tsx` - Investment options
- `pages/TransactionsPage.tsx` - Deposits & withdrawals
- `pages/ReferralsPage.tsx` - Referral program

### Admin Pages
- `pages/AdminUsers.tsx` - User management
- `pages/AdminKYC.tsx` - KYC verification
- `pages/AdminDeposits.tsx` - Deposit requests
- `pages/AdminMessages.tsx` - Custom offers & messages
- `pages/AdminWithdrawals.tsx` - Withdrawal requests
- `pages/AdminInvestments.tsx` - Investment management
- `pages/AdminAffiliates.tsx` - Affiliate program

## How to Access in Figma

### Method 1: Using Main Apps
1. Open `App.tsx` to see the selector screen
2. Click on any of the three main sections:
   - Landing Page & Auth (blue card)
   - Customer Dashboard (purple card)
   - Admin Dashboard (green card)
3. Navigate within each section using their internal navigation

### Method 2: Direct Page Access
1. Navigate to any file in the `/pages` folder
2. Each page is a standalone component
3. Perfect for viewing specific screens in isolation
4. Example: Open `pages/Login.tsx` to view just the login page

### Method 3: Using Component Apps
1. `LandingPageApp.tsx` - Full landing & auth flow
2. `CustomerApp.tsx` - Full customer dashboard
3. `AdminApp.tsx` - Full admin dashboard

## File Organization

```
/
├── App.tsx                          # Main selector (start here)
├── LandingPageApp.tsx              # Landing & auth flows
├── CustomerApp.tsx                  # Customer dashboard
├── AdminApp.tsx                     # Admin dashboard
├── pages/                          # Individual pages (Figma ready)
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── EmailVerify.tsx
│   ├── IdentityVerify.tsx
│   ├── ForgotPass.tsx
│   ├── CustomerDashboard.tsx
│   ├── InvestmentPacksPage.tsx
│   ├── TransactionsPage.tsx
│   ├── ReferralsPage.tsx
│   ├── AdminUsers.tsx
│   ├── AdminKYC.tsx
│   ├── AdminDeposits.tsx
│   ├── AdminWithdrawals.tsx
│   ├── AdminInvestments.tsx
│   ├── AdminAffiliates.tsx
│   └── AdminMessages.tsx
└── components/                      # Reusable components
    ├── LandingPage.tsx
    ├── LoginPage.tsx
    ├── SignupPage.tsx
    ├── Dashboard.tsx
    ├── InvestmentPacks.tsx
    ├── Transactions.tsx
    ├── Referrals.tsx
    ├── EmailVerification.tsx
    ├── IdentityVerification.tsx
    ├── ForgotPassword.tsx
    ├── OfferPopup.tsx
    └── admin/
        ├── AdminDashboard.tsx
        ├── UsersManagement.tsx
        ├── KYCVerification.tsx
        ├── MessagesManagement.tsx
        ├── DepositRequests.tsx
        ├── WithdrawalRequests.tsx
        ├── InvestmentManagement.tsx
        └── AffiliateOverview.tsx
```

## Recommended Workflow

### For Complete Flows
1. Start with `App.tsx` to see all options
2. Choose a section (Landing/Customer/Admin)
3. Navigate through the complete user journey

### For Individual Screens
1. Go directly to the specific page in `/pages`
2. View and edit in isolation
3. Perfect for design refinements

### For Presentations
- **Landing Page & Auth**: Use `LandingPageApp.tsx`
- **Customer Features**: Use `CustomerApp.tsx`
- **Admin Capabilities**: Use `AdminApp.tsx`
- **Specific Features**: Use individual pages

## Key Features by Section

### Landing & Auth (LandingPageApp.tsx)
✓ Responsive landing page with navbar
✓ About us, investment projects, customers, reviews sections
✓ 6 investment projects with images and details
✓ Contact form
✓ Login with forgot password
✓ Signup with full validation
✓ Email verification (6-digit OTP)
✓ Identity verification (document upload)

### Customer Dashboard (CustomerApp.tsx)
✓ Balance overview
✓ 4 investment packs
✓ USDT deposit system
✓ USDT withdrawal system
✓ Referral code & tracking
✓ Transaction history
✓ Earnings tracking
✓ Simplified income chart (daily/weekly/monthly)
✓ Custom offer popups from admin

### Admin Dashboard (AdminApp.tsx)
✓ User management (search, filter, suspend)
✓ KYC document review (approve/reject)
✓ Deposit approvals (verify blockchain)
✓ Withdrawal processing (send USDT)
✓ Investment monitoring (all packs)
✓ Affiliate program stats (commissions)
✓ Custom messages & offers system

## Tips for Figma

1. **Start with Main Apps**: They provide context and full user flows
2. **Use Pages for Details**: Individual pages are great for focusing on specific designs
3. **Check Interactions**: All forms have validation and state management
4. **Responsive Design**: All pages work on mobile and desktop
5. **Consistent Styling**: Uses global styles from `styles/globals.css`

## Component Reusability

All components in `/components` are:
- Fully self-contained
- Accept props for customization
- Can be used in multiple contexts
- Styled consistently with Tailwind CSS

## Mock Data

All pages include realistic mock data:
- Users, transactions, investments
- KYC requests, deposits, withdrawals
- Referral tracking, affiliate stats
- Everything ready for presentation
