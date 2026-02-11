import { useMemo } from "react";
import { Dashboard } from "../components/Dashboard";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/i18n/customerDashboardDict";

export default function CustomerDashboard() {
  const { user, loading } = useAuth();
  const { language, isRTL } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <p className="text-blue-200">
          {t("loading", language)}
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <p className="text-blue-200">
          {language === "ar"
            ? "يرجى تسجيل الدخول لعرض لوحة التحكم."
            : "Please log in to view your dashboard."}
        </p>
      </div>
    );
  }

  const numericBalance = useMemo(() => parseFloat(user.balance ?? "0"), [user.balance]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 ${isRTL ? "text-right" : "text-left"}`}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="flex items-start justify-between gap-6 mb-8">
            <div>
              <h1 className="text-white mb-2">{t("platformTitle", language)}</h1>
              <p className="text-blue-200">{t("platformSubtitle", language)}</p>

              <p className="text-blue-300 text-sm mt-1">
                {t("loggedInAs", language)}{" "}
                <span className="font-mono">{user.email}</span>
              </p>
            </div>

            <div className={`${isRTL ? "text-left" : "text-right"}`}>
              <p className="text-blue-200 text-sm">{t("totalBalance", language)}</p>
              <p className="text-white">
                {user.balance} USDT
              </p>
            </div>
          </div>
        </header>

        <main>
          <Dashboard
            balance={numericBalance}
            selectedPack={language === "ar" ? "باقة بروفيشنال" : "Professional Pack"}
            referralCode={user.referral_code}
          />
        </main>
      </div>
    </div>
  );
}
