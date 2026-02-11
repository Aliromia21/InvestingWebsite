import { Gift, Users, TrendingUp, Award, Lock, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { Progress } from './ui/progress';

interface ReferralPacksProps {
  activeReferrals: number;
  totalEarned: number;
}

interface ReferralPack {
  id: string;
  required: number;
  bonus: number;
  icon: typeof Gift;
  color: string;
  gradient: string;
}

export function ReferralPacks({ activeReferrals = 0, totalEarned = 0 }: ReferralPacksProps) {
  const { t, isRTL } = useLanguage();
  const iconGapClass = isRTL ? 'ml-2' : 'mr-2';

  const packs: ReferralPack[] = [
    {
      id: 'bronze',
      required: 5,
      bonus: 25,
      icon: Award,
      color: 'from-orange-600 to-orange-400',
      gradient: 'from-orange-500/20 to-amber-500/20',
    },
    {
      id: 'silver',
      required: 10,
      bonus: 50,
      icon: Award,
      color: 'from-gray-400 to-gray-300',
      gradient: 'from-gray-500/20 to-slate-400/20',
    },
    {
      id: 'gold',
      required: 20,
      bonus: 150,
      icon: Award,
      color: 'from-yellow-500 to-yellow-300',
      gradient: 'from-yellow-500/20 to-amber-400/20',
    },
    {
      id: 'vip',
      required: 40,
      bonus: 1000,
      icon: Award,
      color: 'from-purple-600 to-pink-500',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
  ];

  const canClaim = (required: number) => activeReferrals >= required;

  const isClaimed = (packId: string) => {
    return false;
  };

  const handleClaim = (pack: ReferralPack) => {
    if (canClaim(pack.required) && !isClaimed(pack.id)) {
      alert(`Claiming ${pack.bonus} USDT bonus! This will be added to your balance.`);
    }
  };

  const progressPercentage = Math.min((activeReferrals / 40) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-white mb-2">{t('referral.title')}</h2>
        <p className="text-blue-200">{t('referral.subtitle')}</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-300/30">
        <h3 className="text-white mb-4">{t('referral.yourProgress')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <p className="text-blue-200 text-sm">{t('referral.activeReferrals')}</p>
            </div>
            <p className="text-white text-2xl">{activeReferrals}</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <p className="text-blue-200 text-sm">{t('referral.totalEarned')}</p>
            </div>
            <p className="text-white text-2xl">
              {totalEarned.toFixed(2)} {t('common.usdt')}
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-purple-400" />
              <p className="text-blue-200 text-sm">{t('referral.commission')}</p>
            </div>
            <p className="text-white text-2xl">3%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-200">0</span>
            <span className="text-white">{activeReferrals} / 40</span>
            <span className="text-blue-200">40</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
      </div>

      {/* Referral Packs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packs.map((pack, idx) => {
          const Icon = pack.icon;
          const claimed = isClaimed(pack.id);
          const unlocked = canClaim(pack.required);

          const pct = Math.round((Math.min(activeReferrals, pack.required) / pack.required) * 100);

          return (
            <div
              key={pack.id}
              className={`bg-gradient-to-br ${pack.gradient} backdrop-blur-sm rounded-xl p-6 border-2 ${
                unlocked ? 'border-green-400/50' : 'border-white/20'
              } transition-all ${unlocked ? 'shadow-lg shadow-green-500/20' : ''}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pack.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white">{t(`referral.pack${idx + 1}`)}</h3>
                    <p className="text-blue-200 text-sm">
                      {pack.required} {t('referral.requiredReferrals')}
                    </p>
                  </div>
                </div>

                {claimed ? (
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                ) : !unlocked ? (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-blue-300" />
                  </div>
                ) : null}
              </div>

              {/* Bonus Amount */}
              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <p className="text-blue-200 text-sm mb-1">{t('referral.bonus')}</p>
                <p className="text-white text-3xl">${pack.bonus}</p>
                <p className="text-green-400 text-sm mt-1">{t('common.usdt')}</p>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-blue-200">
                    {Math.min(activeReferrals, pack.required)} / {pack.required}
                  </span>
                  <span className="text-blue-200">{pct}%</span>
                </div>
                <Progress
                  value={(Math.min(activeReferrals, pack.required) / pack.required) * 100}
                  className="h-2"
                />
              </div>

              {/* Action Button */}
              <Button
                onClick={() => handleClaim(pack)}
                disabled={!unlocked || claimed}
                className={`w-full ${
                  unlocked && !claimed
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                    : 'bg-white/10'
                }`}
              >
                {claimed ? (
                  <>
                    <Check className={`w-4 h-4 ${iconGapClass}`} />
                    {t('referral.claimed')}
                  </>
                ) : unlocked ? (
                  <>
                    <Gift className={`w-4 h-4 ${iconGapClass}`} />
                    {t('referral.claim')}
                  </>
                ) : (
                  <>
                    <Lock className={`w-4 h-4 ${iconGapClass}`} />
                    {t('referral.locked')}
                  </>
                )}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Info Note */}
      <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30">
        <p className="text-blue-200 text-sm text-center">{t('referral.note')}</p>
        <p className="text-blue-300 text-xs text-center mt-2">
          • 3% commission on all deposits from your referrals
        </p>
        <p className="text-blue-300 text-xs text-center">
          • Bonuses can be claimed and withdrawn immediately
        </p>
      </div>
    </div>
  );
}
