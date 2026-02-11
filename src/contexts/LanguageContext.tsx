import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';
type DictValue = string | ((...args: any[]) => string);
type Dict = Record<string, { en: DictValue; ar: DictValue }>;


export const CUSTOMER_DASHBOARD_DICT: Dict = {
  // ===== Common =====
  'common.usdt': { en: 'USDT', ar: 'USDT' },

  // ===== Referral Packs =====
  'referral.title': { en: 'Referral Packs', ar: 'باقات الإحالة' },
  'referral.subtitle': { en: 'Unlock bonuses as you bring more referrals.', ar: 'افتح مكافآت كلما زادت إحالاتك.' },
  'referral.yourProgress': { en: 'Your Progress', ar: 'تقدّمك' },
  'referral.activeReferrals': { en: 'Active Referrals', ar: 'الإحالات الفعّالة' },
  'referral.totalEarned': { en: 'Total Earned', ar: 'إجمالي المكتسبات' },
  'referral.commission': { en: 'Commission', ar: 'العمولة' },

  'referral.pack1': { en: 'Bronze Pack', ar: 'الباقة البرونزية' },
  'referral.pack2': { en: 'Silver Pack', ar: 'الباقة الفضية' },
  'referral.pack3': { en: 'Gold Pack', ar: 'الباقة الذهبية' },
  'referral.pack4': { en: 'VIP Pack', ar: 'باقة VIP' },

  'referral.requiredReferrals': { en: 'required referrals', ar: 'إحالات مطلوبة' },
  'referral.bonus': { en: 'Bonus', ar: 'المكافأة' },
  'referral.claimed': { en: 'Claimed', ar: 'تم التحصيل' },
  'referral.claim': { en: 'Claim Bonus', ar: 'تحصيل المكافأة' },
  'referral.locked': { en: 'Locked', ar: 'مقفلة' },

  'referral.note': {
    en: 'Bonuses are available after completing the required referrals.',
    ar: 'تتوفر المكافآت بعد إكمال عدد الإحالات المطلوب.',
  },

    // ===== Common (extended) =====
  'common.cancel': { en: 'Cancel', ar: 'إلغاء' },
  'common.refresh': { en: 'Refresh', ar: 'تحديث' },
  'common.reload': { en: 'Reload', ar: 'إعادة تحميل' },
  'common.retry': { en: 'Retry', ar: 'إعادة المحاولة' },
  'common.submitting': { en: 'Submitting...', ar: 'جاري الإرسال...' },
  'common.processing': { en: 'Processing...', ar: 'جاري المعالجة...' },

  // ===== Transactions =====
  'tx.title': { en: 'Transactions', ar: 'المعاملات' },
  'tx.loading': { en: 'Loading transactions...', ar: 'جاري تحميل المعاملات...' },
  'tx.currentBalance': { en: 'Current Balance', ar: 'الرصيد الحالي' },
  'tx.searchPlaceholder': {
    en: 'Search by id, type, amount, reference...',
    ar: 'بحث بالرقم أو النوع أو المبلغ أو المرجع...',
  },
  'tx.showing': {
    en: 'Showing {shown} of {total} transactions',
    ar: 'عرض {shown} من أصل {total} معاملة',
  },
  'tx.errors.loadFail': {
    en: 'Failed to load transactions',
    ar: 'فشل تحميل المعاملات',
  },

  // ===== Transaction Types =====
  'tx.type.deposit': { en: 'Deposit', ar: 'إيداع' },
  'tx.type.withdrawal': { en: 'Withdrawal', ar: 'سحب' },
  'tx.type.earning': { en: 'Earning', ar: 'أرباح' },
  'tx.type.reward': { en: 'Reward', ar: 'مكافأة' },
  'tx.type.investment_create': { en: 'Investment Created', ar: 'إنشاء استثمار' },

  // ===== Transaction Filters =====
  'tx.filters.all': { en: 'All', ar: 'الكل' },
  'tx.filters.deposits': { en: 'Deposits', ar: 'الإيداعات' },
  'tx.filters.withdrawals': { en: 'Withdrawals', ar: 'السحوبات' },
  'tx.filters.earnings': { en: 'Earnings', ar: 'الأرباح' },
  'tx.filters.rewards': { en: 'Rewards', ar: 'المكافآت' },
  'tx.filters.investments': { en: 'Investments', ar: 'الاستثمارات' },

  // ===== Direction =====
  'tx.dir.all': { en: 'All', ar: 'الكل' },
  'tx.dir.credit': { en: 'Credit', ar: 'إضافة' },
  'tx.dir.debit': { en: 'Debit', ar: 'خصم' },

  // ===== Table Headers =====
  'tx.table.id': { en: 'ID', ar: 'الرقم' },
  'tx.table.type': { en: 'Type', ar: 'النوع' },
  'tx.table.direction': { en: 'Direction', ar: 'الاتجاه' },
  'tx.table.amount': { en: 'Amount', ar: 'المبلغ' },
  'tx.table.balanceAfter': { en: 'Balance After', ar: 'الرصيد بعد' },
  'tx.table.reference': { en: 'Reference', ar: 'المرجع' },
  'tx.table.created': { en: 'Created', ar: 'التاريخ' },

  // ===== Empty State =====
  'tx.empty.title': { en: 'No transactions found', ar: 'لا توجد معاملات' },
  'tx.empty.subtitle': {
    en: 'Try changing filters or clearing the search.',
    ar: 'جرّب تغيير الفلاتر أو مسح البحث.',
  },

  // ===== Withdrawals =====
  'tx.withdraw.open': { en: 'Withdraw Funds', ar: 'سحب الأموال' },
  'tx.withdraw.listTitle': { en: 'Withdrawal Requests', ar: 'طلبات السحب' },
  'tx.withdraw.listSubtitle': {
    en: 'Track pending/approved/rejected requests',
    ar: 'تتبع طلبات السحب المعلقة والمقبولة والمرفوضة',
  },
  'tx.withdraw.empty': { en: 'No withdrawal requests', ar: 'لا توجد طلبات سحب' },
  'tx.withdraw.request': { en: 'Request', ar: 'طلب' },
  'tx.withdraw.address': { en: 'Address', ar: 'العنوان' },
  'tx.withdraw.txHash': { en: 'Tx Hash', ar: 'هاش العملية' },
  'tx.withdraw.note': { en: 'Note', ar: 'ملاحظة' },

  // ===== Withdraw Status =====
  'tx.withdraw.status.pending': { en: 'Pending', ar: 'قيد الانتظار' },
  'tx.withdraw.status.approved': { en: 'Approved', ar: 'مقبول' },
  'tx.withdraw.status.processing': { en: 'Processing', ar: 'قيد المعالجة' },
  'tx.withdraw.status.completed': { en: 'Completed', ar: 'مكتمل' },
  'tx.withdraw.status.rejected': { en: 'Rejected', ar: 'مرفوض' },

  // ===== Withdraw Dialog =====
  'tx.withdraw.dialogTitle': { en: 'Withdraw Funds', ar: 'سحب الأموال' },
  'tx.withdraw.amountLabel': { en: 'Amount (USDT)', ar: 'المبلغ (USDT)' },
  'tx.withdraw.amountPlaceholder': { en: 'e.g. 50', ar: 'مثال: 50' },
  'tx.withdraw.available': {
    en: 'Available: {balance} {usdt}',
    ar: 'المتاح: {balance} {usdt}',
  },
  'tx.withdraw.addressLabel': { en: 'Payout Address (TRC20)', ar: 'عنوان السحب (TRC20)' },
  'tx.withdraw.addressPlaceholder': {
    en: 'USDT TRON address',
    ar: 'عنوان USDT على شبكة ترون',
  },
  'tx.withdraw.addressHint': {
    en: 'Ensure the address is correct. Admin will review before processing.',
    ar: 'تأكد من صحة العنوان. سيتم مراجعته من قبل الإدارة قبل التنفيذ.',
  },
  'tx.withdraw.submit': { en: 'Submit Request', ar: 'إرسال الطلب' },

  // ===== Withdraw Validation =====
  'tx.withdraw.validation.amountInvalid': {
    en: 'Enter a valid withdrawal amount',
    ar: 'أدخل مبلغ سحب صحيح',
  },
  'tx.withdraw.validation.exceedsBalance': {
    en: 'Amount exceeds your current balance',
    ar: 'المبلغ أكبر من رصيدك الحالي',
  },
  'tx.withdraw.validation.addressInvalid': {
    en: 'Enter a valid payout address',
    ar: 'أدخل عنوان سحب صحيح',
  },
  'tx.withdraw.created': {
    en: 'Withdrawal request created{ref}',
    ar: 'تم إنشاء طلب السحب{ref}',
  },
  'tx.withdraw.createFail': {
    en: 'Failed to create withdrawal request',
    ar: 'فشل إنشاء طلب السحب',
  },
  // ===== Investment Packs =====
  'packs.title': { en: 'Choose Your Investment Pack', ar: 'اختر باقة الاستثمار' },
  'packs.subtitle': {
    en: 'Select the pack that best fits your investment goals',
    ar: 'اختر الباقة التي تناسب أهدافك الاستثمارية',
  },

  'packs.mostPopular': { en: 'Most Popular', ar: 'الأكثر طلباً' },

  'packs.range': { en: 'Investment Range', ar: 'نطاق الاستثمار' },
  'packs.roiLabel': { en: 'ROI', ar: 'العائد' },

  // Pack Names (optional: if you render names via keys)
  'packs.names.prime': { en: 'Prime Pack', ar: 'باقة برايم' },
  'packs.names.extra': { en: 'Extra Pack', ar: 'باقة إكسترا' },
  'packs.names.premium': { en: 'Premium Pack', ar: 'الباقة بريميوم' },
  'packs.names.elite': { en: 'Elite Pack', ar: 'باقة إيليت' },

  // Features (if you render these as translation keys)
  'packs.featureRoi': { en: 'ROI: {roi}%', ar: 'العائد: {roi}%' },
  'packs.featureDuration': { en: 'Duration: {days} days', ar: 'المدة: {days} يوم' },
  'packs.featurePayoutDaily': { en: 'Payout: Daily', ar: 'الأرباح: يومياً' },
  'packs.featurePayoutEnd': { en: 'Payout: End of term', ar: 'الأرباح: نهاية المدة' },
  'packs.featureWithdrawAnytime': { en: 'Withdraw anytime', ar: 'سحب في أي وقت' },
  'packs.featureSupportIncluded': { en: 'Support included', ar: 'دعم متوفر' },

  // Buttons / states
  'packs.select': { en: 'Select Pack', ar: 'اختيار الباقة' },
  'packs.active': { en: 'Active', ar: 'مفعّلة' },
  'packs.inactive': { en: 'Inactive', ar: 'غير متاحة' },

  // Dialog
  'packs.dialog.title': { en: 'Invest in {name}', ar: 'استثمار في {name}' },
  'packs.dialog.desc': {
    en: 'Enter the amount you want to invest (Min: {min} USDT, Max: {max} USDT)',
    ar: 'أدخل مبلغ الاستثمار (الحد الأدنى: {min} USDT، الحد الأقصى: {max} USDT)',
  },
  'packs.dialog.amountLabel': { en: 'Investment Amount (USDT)', ar: 'مبلغ الاستثمار (USDT)' },
  'packs.dialog.available': { en: 'Available balance: {bal} USDT', ar: 'الرصيد المتاح: {bal} USDT' },
  'packs.dialog.insufficient': { en: 'Insufficient balance for this amount.', ar: 'الرصيد غير كافٍ لهذا المبلغ.' },

  'packs.dialog.roi': { en: 'ROI %:', ar: 'نسبة العائد:' },
  'packs.dialog.duration': { en: 'Duration:', ar: 'المدة:' },
  'packs.dialog.expected': { en: 'Expected Return (approx):', ar: 'العائد المتوقع (تقريباً):' },
  'packs.dialog.payoutType': { en: 'Payout Type:', ar: 'نوع الدفع:' },

  'packs.dialog.payoutDaily': { en: 'Daily', ar: 'يومي' },
  'packs.dialog.payoutEnd': { en: 'End of term', ar: 'نهاية المدة' },

  'packs.dialog.cancel': { en: 'Cancel', ar: 'إلغاء' },
  'packs.dialog.confirm': { en: 'Confirm Investment', ar: 'تأكيد الاستثمار' },
  'packs.dialog.processing': { en: 'Processing...', ar: 'جاري المعالجة...' },

  // Toasts
  'packs.toast.inactive': { en: 'This pack is not active', ar: 'هذه الباقة غير متاحة' },
  'packs.toast.checkAmount': { en: 'Please check the amount and your balance.', ar: 'يرجى التأكد من المبلغ ورصيدك.' },
  'packs.toast.successTitle': { en: 'Investment created successfully', ar: 'تم إنشاء الاستثمار بنجاح' },
  'packs.toast.successDesc': { en: '{amt} USDT invested in {name}', ar: 'تم استثمار {amt} USDT في {name}' },
  'packs.toast.failTitle': { en: 'Investment failed', ar: 'فشل الاستثمار' },

  // ===== Investment Packs  =====
'packs.title': { en: 'Choose Your Investment Pack', ar: 'اختر باقة الاستثمار' },
'packs.subtitle': {
  en: 'Select the pack that best fits your investment goals',
  ar: 'اختر الباقة التي تناسب أهدافك الاستثمارية',
},

'packs.mostPopular': { en: 'Most Popular', ar: 'الأكثر طلباً' },
'packs.range': { en: 'Investment Range', ar: 'نطاق الاستثمار' },
'packs.roiLabel': { en: 'ROI', ar: 'العائد' },

'packs.select': { en: 'Select Pack', ar: 'اختيار الباقة' },
'packs.active': { en: 'Active', ar: 'مفعّلة' },
'packs.inactive': { en: 'Inactive', ar: 'غير متاحة' },

// Dialog strings 
'packs.investIn': { en: 'Invest in', ar: 'استثمار في' },
'packs.investHint': {
  en: 'Enter the amount you want to invest',
  ar: 'أدخل مبلغ الاستثمار الذي تريد استثماره',
},
'packs.amountLabel': { en: 'Investment Amount (USDT)', ar: 'مبلغ الاستثمار (USDT)' },
'packs.availableBalance': { en: 'Available balance:', ar: 'الرصيد المتاح:' },
'packs.insufficientBalance': { en: 'Insufficient balance.', ar: 'الرصيد غير كافٍ.' },

'packs.dialogRoi': { en: 'ROI %', ar: 'نسبة العائد' },
'packs.dialogDuration': { en: 'Duration', ar: 'المدة' },
'packs.days': { en: 'days', ar: 'يوم' },
'packs.dialogExpectedReturn': { en: 'Expected Return (approx)', ar: 'العائد المتوقع (تقريباً)' },
'packs.dialogPayoutType': { en: 'Payout Type', ar: 'نوع الدفع' },

'packs.payoutDaily': { en: 'Daily', ar: 'يومي' },
'packs.payoutEnd': { en: 'End of term', ar: 'نهاية المدة' },

'packs.cancel': { en: 'Cancel', ar: 'إلغاء' },
'packs.confirmInvestment': { en: 'Confirm Investment', ar: 'تأكيد الاستثمار' },
'packs.processing': { en: 'Processing...', ar: 'جاري المعالجة...' },

// InvestmentPacks extra states / labels
'packs.loading': { en: 'Loading packs...', ar: 'جاري تحميل الباقات...' },
'packs.loadFail': { en: 'Failed to load packs', ar: 'فشل تحميل الباقات' },
'packs.amountPlaceholder': { en: 'e.g. 100', ar: 'مثال: 100' },
'packs.notActive': { en: 'This pack is not active', ar: 'هذه الباقة غير متاحة' },
'packs.checkAmountAndBalance': { en: 'Please check the amount and your balance.', ar: 'يرجى التأكد من المبلغ ورصيدك.' },
'packs.investSuccessTitle': { en: 'Investment created successfully', ar: 'تم إنشاء الاستثمار بنجاح' },
'packs.investSuccessDesc': { en: '{amount} USDT invested in {pack}', ar: 'تم استثمار {amount} USDT في {pack}' },
'packs.investFailTitle': { en: 'Investment failed', ar: 'فشل الاستثمار' },
'packs.featurePayout': { en: 'Payout: {payout}', ar: 'الأرباح: {payout}' },
'packs.payoutDailyShort': { en: 'Daily', ar: 'يومي' },
'packs.payoutEndShort': { en: 'End', ar: 'نهاية المدة' },


  // ===== Deposits =====
  'tx.deposit.listTitle': {
    en: 'Deposit Requests',
    ar: 'طلبات الإيداع',
  },
  'tx.deposit.listSubtitle': {
    en: 'Track pending/approved/rejected deposits',
    ar: 'تتبع طلبات الإيداع المعلقة والمقبولة والمرفوضة',
  },
  'tx.deposit.empty': {
    en: 'No deposit requests',
    ar: 'لا توجد طلبات إيداع',
  },
  'tx.deposit.request': {
    en: 'Deposit Request',
    ar: 'طلب إيداع',
  },
  'tx.deposit.method': {
    en: 'Payment Method',
    ar: 'طريقة الدفع',
  },
  'tx.deposit.reviewedAt': {
    en: 'Reviewed At',
    ar: 'تاريخ المراجعة',
  },
  'tx.deposit.note': {
    en: 'Admin Note',
    ar: 'ملاحظة الإدارة',
  },


};

type TranslateFn = (key: string, ...args: any[]) => string;

interface LanguageContextValue {
  language: Language;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslateFn;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return saved === 'ar' || saved === 'en' ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const toggleLanguage = () => setLanguageState((prev) => (prev === 'en' ? 'ar' : 'en'));

  const value = useMemo<LanguageContextValue>(() => {
    const isRTL = language === 'ar';

    const t: TranslateFn = (key: string, vars?: Record<string, any>) => {
  const entry = CUSTOMER_DASHBOARD_DICT[key];
  if (!entry) return key;

  let raw = entry[language];
  if (typeof raw === 'function') return raw(vars);

  if (vars && typeof raw === 'string') {
    Object.keys(vars).forEach((k) => {
      raw = raw.replaceAll(`{${k}}`, String(vars[k]));
    });
  }

  return raw;
};


    return { language, isRTL, setLanguage, toggleLanguage, t };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
