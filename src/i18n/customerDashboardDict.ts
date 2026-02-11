
export type Lang = "en" | "ar";
export type DictKey = keyof typeof customerDashboardDict;

export function t(key: DictKey, lang: Lang = "en"): string {
  const entry = customerDashboardDict[key];
  if (!entry) return String(key);
  return entry[lang] ?? entry.en ?? String(key);
}

export const customerDashboardDict = {
  // =========================
  // Brand / Header
  // =========================
  platformTitle: { en: "InvestPro Platform", ar: "منصة إنفست برو" },
  platformSubtitle: { en: "Your Gateway to Smart Investing", ar: "بوابتك إلى الاستثمار الذكي" },
  loggedInAs: { en: "Logged in as", ar: "تسجيل الدخول باسم" },
  logout: { en: "Logout", ar: "تسجيل الخروج" },

  // Language switcher
  languageEN: { en: "EN", ar: "EN" },
  languageAR: { en: "AR", ar: "AR" },

  // =========================
  // Navigation / Tabs
  // =========================
  tabDashboard: { en: "Dashboard", ar: "لوحة التحكم" },
  tabPacks: { en: "Investment Packs", ar: "باقات الاستثمار" },
  tabInvestments: { en: "Investments", ar: "استثماراتي" },
  tabTransactions: { en: "Transactions", ar: "المعاملات" },
  tabReferrals: { en: "Referrals", ar: "الإحالات" },
  tabKyc: { en: "KYC", ar: "توثيق الهوية" },
  tabSupport: { en: "Support", ar: "الدعم" },
  tabMessages: { en: "Messages", ar: "الرسائل" },

  // =========================
  // Dashboard Cards / Metrics
  // =========================
  totalBalance: { en: "Total Balance", ar: "إجمالي الرصيد" },
  availableBalance: { en: "Available Balance", ar: "الرصيد المتاح" },
  activeInvestment: { en: "Active Investment", ar: "الاستثمار النشط" },
  totalProfit: { en: "Total Profit", ar: "إجمالي الأرباح" },
  referralsCount: { en: "Referrals", ar: "الإحالات" },
  none: { en: "None", ar: "لا يوجد" },

  // =========================
  // Wallet / Deposit Address Widget
  // =========================
  depositAddress: { en: "Deposit Address", ar: "عنوان الإيداع" },
  network: { en: "Network", ar: "الشبكة" },
  address: { en: "Address", ar: "العنوان" },
  copy: { en: "Copy", ar: "نسخ" },
  copied: { en: "Copied", ar: "تم النسخ" },
  lastUpdated: { en: "Last Updated", ar: "آخر تحديث" },

  // =========================
  // KYC
  // =========================
  kycVerification: { en: "KYC Verification", ar: "توثيق الهوية" },
  kycDescription: {
    en: "Upload your passport image for verification. Status updates will appear here.",
    ar: "قم برفع صورة جواز السفر للتحقق. سيتم عرض حالة المراجعة هنا.",
  },
  currentStatus: { en: "Current Status", ar: "الحالة الحالية" },
  statusApproved: { en: "approved", ar: "مقبول" },
  statusPending: { en: "pending", ar: "قيد المراجعة" },
  statusRejected: { en: "rejected", ar: "مرفوض" },

  submittedAt: { en: "Submitted", ar: "تاريخ الإرسال" },
  reviewedAt: { en: "Reviewed", ar: "تاريخ المراجعة" },
  notes: { en: "Notes", ar: "ملاحظات" },

  kycApprovedMsg: { en: "Your KYC is approved. No further action is required.", ar: "تمت الموافقة على التوثيق. لا يلزم أي إجراء إضافي." },
  kycPendingMsg: { en: "Your KYC is pending review.", ar: "توثيقك قيد المراجعة." },
  kycRejectedMsg: { en: "Your KYC was rejected. Please review the notes and resubmit.", ar: "تم رفض التوثيق. يرجى مراجعة الملاحظات وإعادة الإرسال." },

  passportImage: { en: "Passport Image", ar: "صورة جواز السفر" },
  noFileChosen: { en: "No file chosen", ar: "لم يتم اختيار ملف" },
  disabledWhilePendingApproved: { en: "(disabled while pending/approved)", ar: "(معطّل أثناء الانتظار/بعد الموافقة)" },

  notesOptional: { en: "Notes (optional)", ar: "ملاحظات (اختياري)" },
  readOnlyWhilePendingApproved: { en: "(read-only while pending/approved)", ar: "(للقراءة فقط أثناء الانتظار/بعد الموافقة)" },
  cannotEditWhilePendingApproved: { en: "You can’t edit while pending/approved.", ar: "لا يمكن التعديل أثناء الانتظار أو بعد الموافقة." },

  submitKyc: { en: "Submit KYC", ar: "إرسال التوثيق" },
  refresh: { en: "Refresh", ar: "تحديث" },

  // =========================
  // Referrals
  // =========================
  referralCode: { en: "Your Referral Code", ar: "كود الإحالة الخاص بك" },
  referralDescription: {
    en: "Share your referral code and earn commissions from your referrals’ investments!",
    ar: "شارك كود الإحالة واحصل على عمولة من استثمارات المدعوين!",
  },
  share: { en: "Share", ar: "مشاركة" },

  // =========================
  // Messages / Offers
  // =========================
  messagesOffers: { en: "Messages & Offers", ar: "الرسائل والعروض" },
  messagesDescription: { en: "View special offers and tasks from administration.", ar: "عرض العروض والمهام الخاصة من الإدارة." },
  openMessages: { en: "Open Messages", ar: "فتح الرسائل" },

  newOfferToastTitle: { en: "New offer from admin", ar: "عرض جديد من الإدارة" },
  newOfferToastDesc: { en: "You have a new task/offer. Open Messages to review and respond.", ar: "لديك مهمة/عرض جديد. افتح الرسائل للمراجعة والرد." },

  accept: { en: "Accept", ar: "قبول" },
  reject: { en: "Reject", ar: "رفض" },
  submitProof: { en: "Submit Proof", ar: "إرسال الإثبات" },
  proofLink: { en: "Proof Link", ar: "رابط الإثبات" },
  reward: { en: "Reward", ar: "المكافأة" },
  rewardGiven: { en: "Reward Given", ar: "تم منح المكافأة" },
  pending: { en: "Pending", ar: "قيد الانتظار" },
  accepted: { en: "Accepted", ar: "مقبول" },
  rejected: { en: "Rejected", ar: "مرفوض" },

  // =========================
  // Support
  // =========================
  support: { en: "Support", ar: "الدعم" },
  ticketsCount: { en: "Tickets", ar: "عدد التذاكر" },
  unreadTickets: { en: "Unread", ar: "غير مقروءة" },
  openSupport: { en: "Open Support", ar: "فتح الدعم" },
  createTicket: { en: "Create Ticket", ar: "إنشاء تذكرة" },
  subject: { en: "Subject", ar: "العنوان" },
  message: { en: "Message", ar: "الرسالة" },
  send: { en: "Send", ar: "إرسال" },

  // =========================
  // Packs / Investments
  // =========================
  investmentPacks: { en: "Investment Packs", ar: "باقات الاستثمار" },
  packDetails: { en: "Pack Details", ar: "تفاصيل الباقة" },
  roiPercent: { en: "ROI (%)", ar: "العائد (%)" },
  durationDays: { en: "Duration (days)", ar: "المدة (أيام)" },
  minAmount: { en: "Min Amount", ar: "الحد الأدنى" },
  maxAmount: { en: "Max Amount", ar: "الحد الأقصى" },
  payoutType: { en: "Payout Type", ar: "نوع الدفعة" },

  invest: { en: "Invest", ar: "استثمر" },
  confirmInvestment: { en: "Confirm Investment", ar: "تأكيد الاستثمار" },
  investmentAmount: { en: "Investment Amount", ar: "مبلغ الاستثمار" },
  investmentFailed: { en: "Investment failed", ar: "فشل الاستثمار" },
  investmentCreated: { en: "Investment created successfully", ar: "تم إنشاء الاستثمار بنجاح" },

  // =========================
  // Deposits / Withdrawals
  // =========================
  deposits: { en: "Deposits", ar: "الإيداعات" },
  withdrawals: { en: "Withdrawals", ar: "السحوبات" },
  createDeposit: { en: "Create Deposit", ar: "إنشاء إيداع" },
  createWithdrawal: { en: "Create Withdrawal", ar: "إنشاء سحب" },
  uploadProof: { en: "Upload Proof", ar: "رفع الإثبات" },
  amount: { en: "Amount", ar: "المبلغ" },
  submit: { en: "Submit", ar: "إرسال" },
  cancel: { en: "Cancel", ar: "إلغاء" },

  // =========================
  // Transactions
  // =========================
  recentTransactions: { en: "Recent Transactions", ar: "آخر العمليات" },
  transactionType: { en: "Type", ar: "النوع" },
  transactionDate: { en: "Date", ar: "التاريخ" },
  transactionAmount: { en: "Amount", ar: "المبلغ" },

  txDeposit: { en: "DEPOSIT", ar: "إيداع" },
  txWithdrawal: { en: "WITHDRAWAL", ar: "سحب" },
  txRoi: { en: "ROI", ar: "عائد الاستثمار" },
  txInvestmentCreate: { en: "INVESTMENT CREATE", ar: "إنشاء استثمار" },

  // =========================
  // Auth / Forgot Password (OTP)
  // =========================
  forgotPassword: { en: "Forgot Password", ar: "نسيت كلمة المرور" },
  sendOtp: { en: "Send Code", ar: "إرسال الرمز" },
  resendOtp: { en: "Resend Code", ar: "إعادة إرسال الرمز" },
  verifyCode: { en: "Verify Code", ar: "تحقق من الرمز" },
  otpCode: { en: "OTP Code", ar: "رمز التحقق" },
  newPassword: { en: "New Password", ar: "كلمة مرور جديدة" },
  confirmPassword: { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
  resetPassword: { en: "Reset Password", ar: "إعادة تعيين كلمة المرور" },

  otpExpired: { en: "OTP expired", ar: "انتهت صلاحية رمز التحقق" },
  otpInvalid: { en: "Invalid OTP", ar: "رمز التحقق غير صحيح" },
  otpSent: { en: "If the email exists, an OTP has been sent.", ar: "إذا كان البريد موجودًا، تم إرسال رمز تحقق." },
  passwordResetSuccess: { en: "Password updated successfully", ar: "تم تحديث كلمة المرور بنجاح" },

  // =========================
  // Common UI
  // =========================
  loading: { en: "Loading...", ar: "جارٍ التحميل..." },
  save: { en: "Save", ar: "حفظ" },
  delete: { en: "Delete", ar: "حذف" },
  close: { en: "Close", ar: "إغلاق" },
  confirm: { en: "Confirm", ar: "تأكيد" },

  // =========================
  // Validation / Errors
  // =========================
  required: { en: "This field is required", ar: "هذا الحقل مطلوب" },
  invalidEmail: { en: "Invalid email address", ar: "البريد الإلكتروني غير صحيح" },
  passwordTooShort: { en: "Password is too short", ar: "كلمة المرور قصيرة جدًا" },
  passwordsNotMatch: { en: "Passwords do not match", ar: "كلمتا المرور غير متطابقتين" },

  unauthorized: { en: "Session expired. Please login again.", ar: "انتهت الجلسة. يرجى تسجيل الدخول مجددًا." },
  serverError: { en: "Server error. Please try again later.", ar: "خطأ في الخادم. يرجى المحاولة لاحقًا." },
} as const;
