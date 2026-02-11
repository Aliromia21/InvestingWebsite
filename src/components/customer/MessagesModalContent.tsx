import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

import { listCustomerMessages, submitMessageLink } from "@/api/customer/messages";

type VerificationStatus = "pending" | "approved" | "rejected";
type UserResponse = "pending" | "accepted" | "declined";

type CustomerMessage = {
  id: number;
  subject: string;
  body: string;
  reward: string;
  submitted_link: string | null;
  verification_status: VerificationStatus;
  user_response: UserResponse;
  reject_notes?: string | null;
  created_at: string;
};

type Lang = "en" | "ar";

const t = {
  title: { en: "Messages & Tasks", ar: "الرسائل والمهام" },
  subtitle: {
    en: "Complete tasks and submit required links to earn rewards.",
    ar: "أكمل المهام وأرسل الروابط المطلوبة لتحصل على المكافآت.",
  },
  back: { en: "Back", ar: "رجوع" },

  loading: { en: "Loading…", ar: "جارٍ التحميل..." },
  empty: { en: "No messages available.", ar: "لا توجد رسائل حالياً." },
  failedLoad: { en: "Failed to load messages.", ar: "فشل تحميل الرسائل." },

  reward: { en: "Reward", ar: "المكافأة" },

  verification: { en: "Verification", ar: "التحقق" },
  yourResponse: { en: "Your response", ar: "ردك" },

  rejectionReason: { en: "Rejection reason", ar: "سبب الرفض" },

  submittedLinkLabel: { en: "Submitted link", ar: "الرابط المُرسل" },
  pleaseEnterLink: { en: "Please enter a link.", ar: "يرجى إدخال رابط." },

  phAcceptFirst: {
    en: "Accept task first to enable submitting...",
    ar: "يجب قبول المهمة أولاً لتفعيل الإرسال...",
  },
  phAlreadySubmitted: { en: "Link already submitted", ar: "تم إرسال الرابط مسبقاً" },
  phPasteHere: { en: "Paste your link here...", ar: "الصق الرابط هنا..." },

  submitting: { en: "Submitting...", ar: "جارٍ الإرسال..." },
  submitLink: { en: "Submit link", ar: "إرسال الرابط" },
  submittedOk: { en: "Link submitted successfully.", ar: "تم إرسال الرابط بنجاح." },
  failedSubmit: { en: "Failed to submit link.", ar: "فشل إرسال الرابط." },

  mustAcceptFirst: { en: "You must accept this task first.", ar: "يجب قبول هذه المهمة أولاً." },
  linkAlreadySubmittedMsg: { en: "Link already submitted.", ar: "تم إرسال الرابط مسبقاً." },
  readyToSubmit: { en: "Ready to submit.", ar: "جاهز للإرسال." },

  statusPending: { en: "pending", ar: "قيد الانتظار" },
  statusApproved: { en: "approved", ar: "مقبول" },
  statusRejected: { en: "rejected", ar: "مرفوض" },

  responsePending: { en: "pending", ar: "قيد الانتظار" },
  responseAccepted: { en: "accepted", ar: "مقبول" },
  responseDeclined: { en: "declined", ar: "مرفوض" },
};

function mapVerificationStatus(s: string, lang: Lang) {
  const v = String(s || "").toLowerCase();
  if (v === "pending") return t.statusPending[lang];
  if (v === "approved") return t.statusApproved[lang];
  if (v === "rejected") return t.statusRejected[lang];
  return s;
}

function mapUserResponse(s: string, lang: Lang) {
  const v = String(s || "").toLowerCase();
  if (v === "pending") return t.responsePending[lang];
  if (v === "accepted") return t.responseAccepted[lang];
  if (v === "declined") return t.responseDeclined[lang];
  return s;
}

export function MessagesModalContent() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<CustomerMessage[]>([]);
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  const [linkDraft, setLinkDraft] = useState<Record<number, string>>({});

  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const lang = (language as Lang) ?? "en";

  async function fetchMessages() {
    setLoading(true);
    try {
      const res = await listCustomerMessages();

      const normalized =
        Array.isArray((res as any)?.data)
          ? (res as any).data
          : Array.isArray((res as any)?.data?.data)
          ? (res as any).data.data
          : Array.isArray((res as any)?.data?.results)
          ? (res as any).data.results
          : [];

      setItems(normalized);
    } catch (e: any) {
      toast.error(e?.message ?? t.failedLoad[lang]);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function handleSubmitLink(id: number) {
    const link = (linkDraft[id] ?? "").trim();

    if (!link) {
      toast.error(t.pleaseEnterLink[lang]);
      return;
    }

    setSubmittingId(id);
    try {
      await submitMessageLink(id, link);
      toast.success(t.submittedOk[lang]);

      setLinkDraft((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });

      await fetchMessages();
    } catch (e: any) {
      toast.error(e?.message ?? t.failedSubmit[lang]);
    } finally {
      setSubmittingId(null);
    }
  }

  const listMaxHeight = useMemo(() => ({ maxHeight: "45vh" as const }), []);

  return (
    <div className={`space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl font-semibold">{t.title[lang]}</h2>
          <p className="text-blue-200 text-sm">{t.subtitle[lang]}</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-200 underline"
          type="button"
        >
          {t.back[lang]}
        </button>
      </div>

      {/* List */}
      <div className="space-y-4 overflow-y-auto pr-1" style={listMaxHeight}>
        {loading ? (
          <div className="text-blue-200">{t.loading[lang]}</div>
        ) : items.length === 0 ? (
          <div className="text-blue-200">{t.empty[lang]}</div>
        ) : (
          items.map((m) => {
            const isAccepted = String(m.user_response || "").toLowerCase() === "accepted";

            const existingLink = (m.submitted_link ?? "").trim();
            const draftLink = (linkDraft[m.id] ?? "").trim();

            const hasLink = !!(existingLink || draftLink);
            const canSubmit = isAccepted && !existingLink; 
            const busy = submittingId === m.id;

            return (
              <div
                key={m.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2 gap-3">
                  <h3 className="text-white font-semibold">{m.subject}</h3>
                  <span className="text-sm text-blue-200">
                    {t.reward[lang]}:{" "}
                    <b className="text-white">{m.reward} USDT</b>
                  </span>
                </div>

                {/* Body */}
                <p className="text-blue-100 text-sm whitespace-pre-wrap mb-4">
                  {m.body}
                </p>

                {/* Status */}
                <div className="flex flex-wrap gap-3 text-sm mb-4 text-blue-200">
                  <span>
                    {t.verification[lang]}:{" "}
                    <b className="text-white">
                      {mapVerificationStatus(m.verification_status, lang)}
                    </b>
                  </span>
                  <span>
                    {t.yourResponse[lang]}:{" "}
                    <b className="text-white">
                      {mapUserResponse(m.user_response, lang)}
                    </b>
                  </span>
                </div>

                {/* Reject Reason */}
                {m.verification_status === "rejected" && m.reject_notes && (
                  <div className="mb-4 rounded-lg bg-red-500/10 border border-red-400/30 p-3 text-red-300 text-sm">
                    {t.rejectionReason[lang]}: {m.reject_notes}
                  </div>
                )}

                {/* Submit link */}
                <div className="mt-4">
                  <label className="block text-blue-200 text-sm mb-2">
                    {t.submittedLinkLabel[lang]}
                  </label>

                  <input
                    type="text"
                    className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm outline-none disabled:opacity-50"
                    placeholder={
                      !isAccepted
                        ? t.phAcceptFirst[lang]
                        : existingLink
                        ? t.phAlreadySubmitted[lang]
                        : t.phPasteHere[lang]
                    }
                    value={linkDraft[m.id] ?? m.submitted_link ?? ""}
                    onChange={(e) =>
                      setLinkDraft((prev) => ({
                        ...prev,
                        [m.id]: e.target.value,
                      }))
                    }
                    disabled={!isAccepted || busy || !!existingLink}
                  />

                  <div className="mt-6 flex items-center gap-3">
                    {canSubmit ? (
                      <button
                        type="button"
                        onClick={() => handleSubmitLink(m.id)}
                        disabled={busy || !draftLink}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
                      >
                        {busy ? t.submitting[lang] : t.submitLink[lang]}
                      </button>
                    ) : (
                      <span className="text-blue-300 text-sm">
                        {!isAccepted
                          ? t.mustAcceptFirst[lang]
                          : existingLink
                          ? t.linkAlreadySubmittedMsg[lang]
                          : hasLink
                          ? t.readyToSubmit[lang]
                          : "—"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
