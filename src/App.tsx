import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Users, ShieldCheck } from 'lucide-react';
import { Toaster } from 'sonner';

import LandingPageApp from './LandingPageApp';
import CustomerApp from './CustomerApp';
import AdminApp from './AdminApp';
import AdminLoginPage from './pages/AdminLoginPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const { user, loading, sessionKind, isAdmin } = useAuth();

  const isCustomerAuthed = !loading && sessionKind === 'customer' && !!user;
  const isAdminAuthed = !loading && sessionKind === 'admin' && !!user && isAdmin;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <Toaster richColors position="top-right" />

      <Routes>
        {/* Landing + Auth */}
        <Route path="/" element={<LandingPageApp />} />

        {/* Customer (Protected) */}
        <Route
          path="/app/*"
          element={isCustomerAuthed ? <CustomerApp /> : <Navigate to="/" replace />}
        />

        {/* Admin Login (Public) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin (Protected) */}
        <Route
          path="/admin/*"
          element={isAdminAuthed ? <AdminApp /> : <Navigate to="/admin/login" replace />}
        />


        {/* Preview فقط */}
        <Route path="/preview" element={<PreviewSelector />} />

        {/* أي مسار غير معروف */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LanguageProvider>
  );
}

/**
 * شاشة معاينة /preview
 */
function PreviewSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-white mb-4">InvestPro Platform</h1>
          <p className="text-blue-200 text-lg">Select a section to preview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Landing */}
          <a
            href="/"
            className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-blue-400 hover:bg-white/20 transition-all"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Home className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-white mb-3">Landing Page & Auth</h2>
            <p className="text-blue-200 text-sm mb-4">
              Public website, login, signup, email & identity verification, forgot password
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Landing</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Login</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Signup</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">KYC</span>
            </div>
          </a>

          {/* Customer */}
          <a
            href="/app"
            className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-purple-400 hover:bg-white/20 transition-all"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-white mb-3">Customer Dashboard</h2>
            <p className="text-blue-200 text-sm mb-4">
              User dashboard, investments, deposits, withdrawals, and referrals
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">Dashboard</span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">Invest</span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">Transactions</span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">Referrals</span>
            </div>
          </a>

          {/* Admin */}
          <a
            href="/admin"
            className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-green-400 hover:bg-white/20 transition-all"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-white mb-3">Admin Dashboard</h2>
            <p className="text-blue-200 text-sm mb-4">
              User management, KYC verification, deposits, withdrawals, investments & affiliates
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">Users</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">KYC</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">Deposits</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">Affiliates</span>
            </div>
          </a>
        </div>

        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-white mb-4 text-center">Platform Sections</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-blue-300 mb-2">Landing Page & Auth:</p>
              <ul className="text-blue-200 text-xs space-y-1">
                <li>• Home page with features</li>
                <li>• Login & signup forms</li>
                <li>• Email verification (OTP)</li>
                <li>• Identity verification (KYC)</li>
                <li>• Forgot password flow</li>
              </ul>
            </div>
            <div>
              <p className="text-purple-300 mb-2">Customer Dashboard:</p>
              <ul className="text-purple-200 text-xs space-y-1">
                <li>• Main dashboard overview</li>
                <li>• Investment packs</li>
                <li>• Deposit & withdraw USDT</li>
                <li>• Referral program</li>
                <li>• Transaction history</li>
              </ul>
            </div>
            <div>
              <p className="text-green-300 mb-2">Admin Dashboard:</p>
              <ul className="text-green-200 text-xs space-y-1">
                <li>• User management</li>
                <li>• KYC document review</li>
                <li>• Approve deposits</li>
                <li>• Process withdrawals</li>
                <li>• Investment tracking</li>
                <li>• Affiliate program stats</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-blue-300 text-sm">
            Tip: Each section is independent. Navigate within each section to explore all pages.
          </p>
        </div>
      </div>
    </div>
  );
}
