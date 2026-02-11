# API Integration Examples

This guide shows how to integrate the API services into your existing components.

## Table of Contents
1. [Login Component Example](#login-component-example)
2. [Dashboard Component Example](#dashboard-component-example)
3. [Investment Component Example](#investment-component-example)
4. [Admin Component Example](#admin-component-example)

---

## Login Component Example

Here's how to update the LoginPage component to use real API authentication:

```tsx
// components/LoginPage.tsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';

export function LoginPage({ onLogin, onSwitchToSignup, onForgotPassword }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login({ email, password });
      onLogin(); // Navigate to dashboard
    } catch (err) {
      // Error is handled by useAuth hook
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
        <h2 className="text-white text-center mb-6">
          {t('login')}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-blue-200 text-sm mb-2">
              {t('email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-blue-200 text-sm mb-2">
              {t('password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? t('loading') : t('login')}
          </button>
        </form>

        <button
          onClick={onForgotPassword}
          className="w-full mt-4 text-blue-300 hover:text-blue-200 text-sm"
          disabled={loading}
        >
          {t('forgotPassword')}
        </button>

        <div className="mt-6 text-center">
          <span className="text-blue-200">
            {t('dontHaveAccount')}{' '}
          </span>
          <button
            onClick={onSwitchToSignup}
            className="text-blue-400 hover:text-blue-300"
            disabled={loading}
          >
            {t('signup')}
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## Dashboard Component Example

Update Dashboard to fetch real data:

```tsx
// components/Dashboard.tsx
import { useEffect, useState } from 'react';
import { TrendingUp, Users, Wallet, Package } from 'lucide-react';
import { ProfessionalChart } from './ProfessionalChart';
import { dashboardService } from '../services/dashboard.service';
import { investmentService } from '../services/investment.service';
import type { DashboardStats, UserInvestment } from '../types/api';

interface DashboardProps {
  balance: number;
  selectedPack: string | null;
  referralCode: string;
}

export function Dashboard({ balance, selectedPack, referralCode }: DashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [investment, setInvestment] = useState<UserInvestment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, investmentsData] = await Promise.all([
        dashboardService.getUserStats(),
        investmentService.getUserInvestments(),
      ]);
      
      setStats(statsData);
      
      // Get active investment
      const activeInvestment = investmentsData.find(inv => inv.status === 'active');
      setInvestment(activeInvestment || null);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const growthRate = investment 
    ? investment.pack.daily_return_rate 
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-blue-200 text-sm mb-1">Available Balance</p>
          <p className="text-white">
            {stats?.total_balance.toFixed(2) || '0.00'} USDT
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 text-green-400" />
          </div>
          <p className="text-blue-200 text-sm mb-1">Active Investment</p>
          <p className="text-white">
            {investment ? investment.pack.name : 'None'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-blue-200 text-sm mb-1">Total Earnings</p>
          <p className="text-white">
            {stats?.total_earnings.toFixed(2) || '0.00'} USDT
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-blue-200 text-sm mb-1">Referrals</p>
          <p className="text-white">
            {stats?.total_referrals || 0} Active
          </p>
        </div>
      </div>

      {/* Referral Card */}
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-300/30">
        <h3 className="text-white mb-4">Your Referral Code</h3>
        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <p className="text-center text-white tracking-widest">{referralCode}</p>
        </div>
        <p className="text-purple-100 text-sm">
          Share your code and earn 3% commission on all referred investments!
        </p>
      </div>

      {/* Professional Chart */}
      {investment && (
        <ProfessionalChart 
          investmentId={investment.id}
          selectedPack={investment.pack.name} 
        />
      )}

      {/* Investment Performance */}
      {investment && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-white mb-4">Investment Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-blue-200 text-sm mb-1">Daily ROI</p>
              <p className="text-white">{growthRate}%</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm mb-1">Days Active</p>
              <p className="text-white">{investment.days_elapsed} days</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm mb-1">Total Returns</p>
              <p className="text-green-400">
                +{investment.total_return.toFixed(2)} USDT
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Investment Component Example

Update InvestmentPacks to use real data:

```tsx
// components/InvestmentPacks.tsx
import { useState, useEffect } from 'react';
import { investmentService } from '../services/investment.service';
import { useAuth } from '../hooks/useAuth';
import type { InvestmentPack } from '../types/api';

export function InvestmentPacks() {
  const [packs, setPacks] = useState<InvestmentPack[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPack, setSelectedPack] = useState<InvestmentPack | null>(null);
  const [amount, setAmount] = useState('');
  const [investing, setInvesting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadPacks();
  }, []);

  const loadPacks = async () => {
    try {
      const data = await investmentService.getInvestmentPacks();
      setPacks(data.filter(pack => pack.is_active));
    } catch (error) {
      console.error('Failed to load investment packs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvest = async () => {
    if (!selectedPack || !amount) return;

    const investAmount = parseFloat(amount);
    
    if (investAmount < selectedPack.min_amount || investAmount > selectedPack.max_amount) {
      alert(`Amount must be between $${selectedPack.min_amount} and $${selectedPack.max_amount}`);
      return;
    }

    if (user && investAmount > user.balance) {
      alert('Insufficient balance');
      return;
    }

    setInvesting(true);
    try {
      await investmentService.createInvestment(selectedPack.id, investAmount);
      alert('Investment created successfully!');
      setSelectedPack(null);
      setAmount('');
    } catch (error) {
      console.error('Investment failed:', error);
      alert('Investment failed. Please try again.');
    } finally {
      setInvesting(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading investment packs...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-white text-center mb-8">Choose Your Investment Pack</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packs.map((pack) => (
          <div
            key={pack.id}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-blue-400 transition cursor-pointer"
            onClick={() => setSelectedPack(pack)}
          >
            <h3 className="text-white mb-4">{pack.name}</h3>
            <div className="space-y-3">
              <div>
                <p className="text-blue-200 text-sm">Daily Return</p>
                <p className="text-white">{pack.daily_return_rate}%</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Investment Range</p>
                <p className="text-white">
                  ${pack.min_amount} - ${pack.max_amount}
                </p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Duration</p>
                <p className="text-white">{pack.duration_days} days</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Investment Dialog */}
      {selectedPack && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-white mb-4">Invest in {selectedPack.name}</h3>
            
            <div className="mb-4">
              <label className="block text-blue-200 text-sm mb-2">
                Amount (USDT)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={selectedPack.min_amount}
                max={selectedPack.max_amount}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white"
                placeholder={`${selectedPack.min_amount} - ${selectedPack.max_amount}`}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedPack(null)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg"
                disabled={investing}
              >
                Cancel
              </button>
              <button
                onClick={handleInvest}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg"
                disabled={investing}
              >
                {investing ? 'Processing...' : 'Invest'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Admin Component Example

Update AdminDashboard to use real data:

```tsx
// components/admin/AdminDashboard.tsx
import { useEffect, useState } from 'react';
import { Users, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { adminService } from '../../services/admin.service';
import type { AdminStats } from '../../types/api';

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await adminService.getAdminStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-white">Admin Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-blue-200 text-sm mb-1">Total Users</p>
          <p className="text-white">{stats?.total_users || 0}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
          <p className="text-blue-200 text-sm mb-1">Active Investments</p>
          <p className="text-white">{stats?.active_investments || 0}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-blue-200 text-sm mb-1">Pending Requests</p>
          <p className="text-white">
            {(stats?.pending_deposits || 0) + (stats?.pending_withdrawals || 0) + (stats?.pending_kyc || 0)}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-blue-200 text-sm mb-1">Platform Balance</p>
          <p className="text-white">
            ${stats?.total_platform_balance.toFixed(2) || '0.00'}
          </p>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-white mb-4">Recent Users</h3>
        <div className="space-y-3">
          {stats?.recent_users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between py-2 border-b border-white/10"
            >
              <div>
                <p className="text-white">{user.username}</p>
                <p className="text-blue-200 text-sm">{user.email}</p>
              </div>
              <p className="text-white text-sm">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Error Handling Pattern

Example of proper error handling in components:

```tsx
import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { transactionService } from '../services/transaction.service';

export function WithdrawForm() {
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState('');
  
  const {
    execute: createWithdrawal,
    loading,
    error
  } = useApi(transactionService.createWithdrawal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createWithdrawal(parseFloat(amount), wallet);
      alert('Withdrawal request submitted successfully!');
      setAmount('');
      setWallet('');
    } catch (err) {
      // Error is already captured by useApi hook
      console.error('Withdrawal failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}
      
      {/* Form fields */}
      
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Submit Withdrawal'}
      </button>
    </form>
  );
}
```

---

## Authentication Flow

Update App.tsx to use authentication:

```tsx
// App.tsx
import { useEffect, useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { useAuth } from './hooks/useAuth';
import { LandingPageApp } from './LandingPageApp';
import { CustomerApp } from './CustomerApp';
import { AdminApp } from './AdminApp';

function AppContent() {
  const { user, loading, loadUser } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | 'customer' | 'admin'>('landing');

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      setCurrentView(user.role === 'admin' ? 'admin' : 'customer');
    } else {
      setCurrentView('landing');
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (currentView === 'landing') {
    return <LandingPageApp />;
  }

  if (currentView === 'admin') {
    return <AdminApp />;
  }

  return <CustomerApp />;
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
```

