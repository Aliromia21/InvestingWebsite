import { useEffect, useMemo, useState } from 'react';
import { Copy, Check, Users, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { ReferralPacks } from './ReferralPacks';
import { api } from '../api/api';
import { toast } from 'sonner';

interface ReferralsProps {
  referralCode: string;
}

type Tx = {
  id: number;
  tx_type: string;
  direction: 'credit' | 'debit' | string;
  amount: string;
  balance_before: string;
  balance_after: string;
  reference: string;
  metadata: Record<string, any>;
  created_at: string;
};

function toNumber(v: any, fallback = 0) {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
  return Number.isFinite(n) ? n : fallback;
}

export function Referrals({ referralCode }: ReferralsProps) {
  const [copiedField, setCopiedField] = useState<'code' | 'link' | null>(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [referralCounter, setReferralCounter] = useState<number>(0);

  const [transactions, setTransactions] = useState<Tx[]>([]);

  const referralLink = useMemo(
    () => `https://investpro.com/ref/${referralCode}`,
    [referralCode]
  );

  const handleCopy = async (text: string, field: 'code' | 'link') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(field === 'code' ? 'Referral code copied' : 'Referral link copied');
      setTimeout(() => setCopiedField(null), 1200);
    } catch {
      toast.error('Copy failed. Please try again.');
    }
  };

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setErrorMsg(null);

        const [profileRes, txRes] = await Promise.all([
          api.get('/customer/profile/'),
          api.get('/customer/transactions/'),
        ]);

        if (!mounted) return;

        const profile = profileRes.data?.data ?? profileRes.data;
        setReferralCounter(Number(profile?.referral_counter ?? 0));

        const list: Tx[] = txRes.data?.data ?? [];
        setTransactions(list);
      } catch (err: any) {
        const msg =
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.message ||
          'Failed to load referrals data';
        if (mounted) setErrorMsg(String(msg));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const totalReferralEarnings = useMemo(() => {
    return transactions
      .filter((t) => t.tx_type === 'reward')
      .reduce((sum, t) => sum + toNumber(t.amount, 0), 0);
  }, [transactions]);

  
  const totalReferralInvestments = 0;

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <p className="text-white">Loading referrals...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
          <div>
            <p className="text-white">Failed to load referrals</p>
            <p className="text-blue-200 text-sm mt-1">{errorMsg}</p>
            <Button
              className="mt-4 bg-white/10 hover:bg-white/20 text-white"
              onClick={() => window.location.reload()}
            >
              Reload
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalReferrals = referralCounter;

  return (
    <div className="space-y-8">
      {/* Referral Packs Section */}
      <ReferralPacks activeReferrals={totalReferrals} totalEarned={totalReferralEarnings} />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-blue-200 text-sm">Total Referrals</p>
              <p className="text-white">{totalReferrals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-blue-200 text-sm">Total Earnings</p>
              <p className="text-white">{totalReferralEarnings.toFixed(2)} USDT</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-blue-200 text-sm">Team Investment</p>
              <p className="text-white">
                {totalReferralInvestments === 0 ? '—' : `${totalReferralInvestments.toLocaleString()} USDT`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Code Section */}
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8 border border-purple-300/30">
        <div className="text-center mb-6">
          <h3 className="text-white mb-2">Your Referral Code</h3>
          <p className="text-purple-100">Share this code and earn commission on every investment!</p>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <div>
            <label className="text-sm text-purple-200 mb-2 block">Referral Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="flex-1 bg-black/30 border border-purple-300/30 rounded-lg px-4 py-3 text-white text-center tracking-widest"
              />
              <Button
                onClick={() => handleCopy(referralCode, 'code')}
                variant="outline"
                className="bg-white/10 border-purple-300/30"
              >
                {copiedField === 'code' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm text-purple-200 mb-2 block">Referral Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-black/30 border border-purple-300/30 rounded-lg px-4 py-3 text-white text-sm"
              />
              <Button
                onClick={() => handleCopy(referralLink, 'link')}
                variant="outline"
                className="bg-white/10 border-purple-300/30"
              >
                {copiedField === 'link' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="bg-black/20 rounded-lg p-4 text-center">
            <p className="text-purple-200 text-sm mb-1">Commission Rate</p>
            <p className="text-white">3%</p>
          </div>
          <div className="bg-black/20 rounded-lg p-4 text-center">
            <p className="text-purple-200 text-sm mb-1">Lifetime Earnings</p>
            <p className="text-green-400">{totalReferralEarnings.toFixed(2)} USDT</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-white mb-4">How Referral Program Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mb-3">1</div>
            <p className="text-white text-sm mb-2">Share Your Code</p>
            <p className="text-blue-200 text-xs">Share your unique referral code or link with friends</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center mb-3">2</div>
            <p className="text-white text-sm mb-2">They Sign Up</p>
            <p className="text-blue-200 text-xs">Your friends register using your referral code</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mb-3">3</div>
            <p className="text-white text-sm mb-2">They Invest</p>
            <p className="text-blue-200 text-xs">When they make an investment, you earn commission</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center mb-3">4</div>
            <p className="text-white text-sm mb-2">You Earn</p>
            <p className="text-blue-200 text-xs">Receive commission to your balance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
