# InvestPro Platform Guide

## Overview
Complete investing platform with user management, KYC verification, investment packs, referral system, and comprehensive admin dashboard.

## User Flow

### 1. Registration & Verification
1. **Sign Up** - User creates account with:
   - Full name, email, phone number
   - Password (8+ chars, uppercase, lowercase, number)
   - Country selection
   - Optional referral code

2. **Email Verification**
   - 6-digit OTP sent to email
   - 60-second countdown before resend
   - Automatic progression after verification

3. **Identity Verification (KYC)**
   - Upload passport OR national ID
   - Front and back (for ID)
   - Max 5MB per file
   - Supported: JPG, PNG, PDF
   - Manual review by customer service team
   - Users can access dashboard but limited features until approved

### 2. User Dashboard Features

#### Investment Packs
- **Starter Pack**: 100-999 USDT, 1.5% daily
- **Professional Pack**: 1,000-4,999 USDT, 2.0% daily (Most Popular)
- **Premium Pack**: 5,000-19,999 USDT, 2.5% daily
- **Elite Pack**: 20,000-100,000 USDT, 3.0% daily

#### Deposit System
- USDT (TRC20) deposits
- Copy platform wallet address
- Submit transaction hash
- Pending admin approval

#### Withdrawal System
- Enter recipient wallet address (TRC20)
- Minimum 20 USDT
- 1 USDT network fee
- Admin processes manually

#### Referral Program
- Unique referral code for each user
- Commission rates: 3-10% based on pack
- Track referrals and earnings
- Lifetime passive income

### 3. Login
- Email + password
- Remember me option
- Forgot password flow with email verification

## Admin Dashboard

### Access
- Login with: **admin@investpro.com**
- Full management capabilities

### Admin Features

#### 1. Users Management
- View all registered users
- Search by name, email, or referral code
- Filter by account status (active/suspended/banned)
- View detailed user information
- **Actions:**
  - View full user profile
  - Suspend/activate accounts
  - Adjust user balance manually
  - Track user investments and earnings

#### 2. KYC Verification
- Review pending identity documents
- View uploaded passport/ID images
- **Actions:**
  - Approve documents (user gets full access)
  - Reject with reason (user notified)
  - View document details and user info

#### 3. Deposit Requests
- Review pending USDT deposits
- Verify transaction hash on blockchain
- View deposit amount and user details
- **Actions:**
  - Approve & credit user account
  - Reject and notify user
  - View transaction on blockchain explorer

#### 4. Withdrawal Requests
- Process pending withdrawal requests
- View recipient wallet address
- Calculate net amount (minus fees)
- **Actions:**
  - Send USDT to user wallet
  - Enter transaction hash
  - Confirm completion
  - Reject if needed

#### 5. Investment Management
- View all active investments
- Track investment pack performance
- Monitor daily returns and ROI
- Filter by pack type or status
- **Statistics:**
  - Total invested amounts
  - Earnings paid out
  - Average ROI per pack
  - Days active tracking

#### 6. Affiliate Program Overview
- View all active affiliates
- Track referral performance
- Monitor commission payouts
- **Rankings:**
  - Top performers
  - Total referrals
  - Total investment from referrals
  - Commission earned
- **Program Structure:**
  - Starter: 3% commission
  - Professional: 5% commission
  - Premium: 7% commission
  - Elite: 10% commission

## Key Features

### Security
- Email verification required
- KYC/identity verification mandatory
- Password strength requirements
- Encrypted data storage
- Manual admin approval for deposits/withdrawals

### Transparency
- Full transaction history
- Real-time balance updates
- Blockchain transaction hashes
- Clear commission structure
- Detailed investment performance

### Support
- 24/7 customer support
- Contact form on landing page
- Admin review within 24-48 hours
- Email notifications for all actions

## Technical Notes

### Demo Access
- Regular User: Use any email during signup
- Admin Access: Login with **admin@investpro.com**

### Mock Data
- Pre-populated with sample users
- Example transactions and investments
- Demo KYC requests
- Sample referral data

### Future Enhancements
- Real-time chat support
- Automated deposit verification via blockchain API
- Multi-currency support
- Mobile app
- Two-factor authentication (2FA)
- Advanced analytics and reporting
