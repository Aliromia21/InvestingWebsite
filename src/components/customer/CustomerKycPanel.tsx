import { useMemo, useState, useEffect  } from "react";
import { useCustomerKyc } from "@/hooks/useCustomerKyc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

type Lang = "en" | "ar";

const kycT = {
  title: { en: "KYC Verification", ar: "توثيق الهوية" },
  desc: {
    en: "Upload your passport image for verification. Status updates will appear here.",
    ar: "قم برفع صورة جواز السفر للتحقق. سيتم عرض حالة المراجعة هنا.",
  },
  loading: { en: "Loading KYC status…", ar: "جارٍ تحميل حالة التوثيق..." },
  failedLoad: { en: "Failed to load KYC status", ar: "فشل تحميل حالة التوثيق" },

  currentStatus: { en: "Current Status", ar: "الحالة الحالية" },
  notSubmitted: { en: "Not submitted", ar: "غير مُرسل" },

  submitted: { en: "Submitted", ar: "تاريخ الإرسال" },
  reviewed: { en: "Reviewed", ar: "تاريخ المراجعة" },

  notes: { en: "Notes", ar: "ملاحظات" },

  rejectedMsg: {
    en: "Your KYC was rejected. Please upload a clearer passport image and resubmit.",
    ar: "تم رفض التوثيق. يرجى رفع صورة أوضح لجواز السفر ثم إعادة الإرسال.",
  },
  pendingMsg: { en: "Your KYC is under review.", ar: "توثيقك قيد المراجعة." },
  approvedMsg: {
    en: "Your KYC is approved. No further action is required.",
    ar: "تمت الموافقة على التوثيق. لا يلزم أي إجراء إضافي.",
  },

  passportImage: { en: "Passport Image", ar: "صورة جواز السفر" },
  disabledWhile: { en: "(disabled while pending/approved)", ar: "(معطّل أثناء الانتظار/بعد الموافقة)" },
  selected: { en: "Selected", ar: "تم اختيار" },
  currentFile: { en: "Current file:", ar: "الملف الحالي:" },
  openFullImage: { en: "Open full image", ar: "فتح الصورة كاملة" },

  notesOptional: { en: "Notes (optional)", ar: "ملاحظات (اختياري)" },
  readOnlyWhile: { en: "(read-only while pending/approved)", ar: "(للقراءة فقط أثناء الانتظار/بعد الموافقة)" },
  cannotEdit: { en: "You can’t edit while pending/approved.", ar: "لا يمكن التعديل أثناء الانتظار أو بعد الموافقة." },
  notesPlaceholder: {
    en: "Optional note (e.g., 'Passport image submitted')",
    ar: "ملاحظة اختيارية (مثال: \"تم رفع صورة جواز السفر\")",
  },

  submitting: { en: "Submitting…", ar: "جارٍ الإرسال..." },
  submitKyc: { en: "Submit KYC", ar: "إرسال التوثيق" },
  resubmitKyc: { en: "Resubmit KYC", ar: "إعادة إرسال التوثيق" },
  refresh: { en: "Refresh", ar: "تحديث" },

  uploadPassportAlert: { en: "Please upload a passport image.", ar: "يرجى رفع صورة جواز السفر." },
  failedSubmit: { en: "Failed to submit KYC", ar: "فشل إرسال التوثيق" },

  statusApproved: { en: "approved", ar: "مقبول" },
  statusPending: { en: "pending", ar: "قيد المراجعة" },
  statusRejected: { en: "rejected", ar: "مرفوض" },
};

function formatDate(iso?: string | null, lang: Lang = "en") {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString(lang === "ar" ? "ar-EG" : "en-US");
}

function formatStatusLabel(status: string | undefined, lang: Lang) {
  const s = String(status ?? "").toLowerCase();
  if (s === "approved") return kycT.statusApproved[lang];
  if (s === "pending") return kycT.statusPending[lang];
  if (s === "rejected") return kycT.statusRejected[lang];
  return status ?? "—";
}

export function CustomerKycPanel() {
  const { language, isRTL } = useLanguage();
  const lang = (language as Lang) ?? "en";

  const { query, submit } = useCustomerKyc();
  const kyc = query.data;

  const [notes, setNotes] = useState("");
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (passportPreview) {
        URL.revokeObjectURL(passportPreview);
      }
    };
  }, [passportPreview]);


  const state = useMemo(() => {
    if (!kyc) return "NOT_SUBMITTED" as const;
    return kyc.status.toUpperCase() as "PENDING" | "APPROVED" | "REJECTED";
  }, [kyc]);

  const canSubmit = state === "NOT_SUBMITTED" || state === "REJECTED";
  const readOnly = state === "PENDING" || state === "APPROVED";

  const canSubmitNow = canSubmit && !!passportFile;

const onSubmit = () => {
  if (readOnly) return;

  if (!passportFile) {
    alert(kycT.uploadPassportAlert[lang]);
    return;
  }

  submit.mutate({
    passportImage: passportFile,
    notes: notes.trim() ? notes.trim() : undefined,
  });
};


  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 space-y-4 text-white ${isRTL ? "text-right" : "text-left"}`}>
      <div>
        <h2 className="text-white mb-1">{kycT.title[lang]}</h2>
        <p className="text-blue-200 text-sm">{kycT.desc[lang]}</p>
      </div>

      {query.isLoading && <p className="text-blue-200">{kycT.loading[lang]}</p>}
      {query.error && (
        <p className="text-red-400">
          {(query.error as any)?.message || kycT.failedLoad[lang]}
        </p>
      )}

      {!query.isLoading && !query.error && (
        <>
          {/* Status Card */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-blue-200 text-sm">{kycT.currentStatus[lang]}</p>
                <p className="text-white text-lg">
                  {state === "NOT_SUBMITTED"
                    ? kycT.notSubmitted[lang]
                    : formatStatusLabel(kyc?.status, lang)}
                </p>
              </div>

              <div className="text-sm text-blue-200">
                <div>
                  {kycT.submitted[lang]}: {formatDate(kyc?.submitted_at, lang)}
                </div>
                <div>
                  {kycT.reviewed[lang]}: {formatDate(kyc?.reviewed_at, lang)}
                </div>
              </div>
            </div>

            {/* Server notes */}
            {kyc?.notes && (
              <div className="mt-3 text-sm">
                <p className="text-blue-200">{kycT.notes[lang]}</p>
                <p className="text-white/90 whitespace-pre-wrap">{kyc.notes}</p>
              </div>
            )}

            {state === "REJECTED" && (
              <div className="mt-3 text-sm text-red-300">{kycT.rejectedMsg[lang]}</div>
            )}

            {state === "PENDING" && (
              <div className="mt-3 text-sm text-yellow-300">{kycT.pendingMsg[lang]}</div>
            )}

            {state === "APPROVED" && (
              <div className="mt-3 text-sm text-green-300">{kycT.approvedMsg[lang]}</div>
            )}
          </div>

          {/* Upload + Notes */}
          <div className="space-y-3">
            <div>
              <label className="text-blue-200 text-sm block mb-1">
                {kycT.passportImage[lang]}{" "}
                  {canSubmit ? <span className="text-red-300">*</span> : null}
                {readOnly ? kycT.disabledWhile[lang] : ""}
              </label>

                  <input
                    id="passportUpload"
      type="file"
      accept="image/*"
      disabled={readOnly || submit.isPending}
      onChange={(e) => {
        const f = e.target.files?.[0] ?? null;
        setPassportFile(f);

        if (passportPreview) URL.revokeObjectURL(passportPreview);
        setPassportPreview(f ? URL.createObjectURL(f) : null);
      }}
      className="hidden"
                    />

<div className="flex flex-col sm:flex-row sm:items-center gap-3">
  <label
    htmlFor="passportUpload"
    className={[
      "inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium",
      "bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer",
      "hover:opacity-90 transition",
      (readOnly || submit.isPending) ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    ].join(" ")}
  >
    {passportFile ? "Change image" : "Upload passport image"}
  </label>

  <div className="text-xs text-blue-200">
    {passportFile ? (
      <>
        {kycT.selected[lang]}: <span className="text-white">{passportFile.name}</span>
      </>
    ) : (
      <span>No file selected</span>
    )}
  </div>
</div>

{passportPreview && (
  <img
    src={passportPreview}
    alt="Selected passport preview"
    className="mt-3 w-40 rounded-lg border border-white/20"
  />
)}

                    {state !== "NOT_SUBMITTED" && (
          <p className="text-blue-200 text-xs mt-2">
            Your passport image has been uploaded and is under review.
          </p>
        )}

            </div>

            <div>
              <label className="text-blue-200 text-sm block mb-1">
                {kycT.notesOptional[lang]} {readOnly ? kycT.readOnlyWhile[lang] : ""}
              </label>

              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={canSubmit ? kycT.notesPlaceholder[lang] : kycT.cannotEdit[lang]}
                className="bg-white/10 border-white/20 text-white min-h-[110px]"
                disabled={readOnly || submit.isPending}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={onSubmit}
                className="bg-blue-500 hover:bg-blue-600"
                disabled={!canSubmitNow || submit.isPending}
              >
                {submit.isPending
                  ? kycT.submitting[lang]
                  : state === "REJECTED"
                  ? kycT.resubmitKyc[lang]
                  : kycT.submitKyc[lang]}
              </Button>

              <Button
                variant="outline"
                className="bg-transparent border-white/20"
                onClick={() => query.refetch()}
                disabled={query.isFetching}
              >
                {kycT.refresh[lang]}
              </Button>
            </div>

            {submit.error && (
              <p className="text-red-400 text-sm">
                {(submit.error as any)?.message || kycT.failedSubmit[lang]}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
