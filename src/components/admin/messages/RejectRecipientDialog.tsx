import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientId: number | null;
  onConfirm: (notes: string) => Promise<void>;
  busy?: boolean;
};

export function RejectRecipientDialog({
  open,
  onOpenChange,
  recipientId,
  onConfirm,
  busy = false,
}: Props) {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) setNotes("");
  }, [open]);

  const canSubmit = useMemo(() => {
    return !!recipientId && notes.trim().length >= 3 && !busy;
  }, [recipientId, notes, busy]);

  async function handleSubmit() {
    if (!recipientId) return;
    const trimmed = notes.trim();
    if (trimmed.length < 3) {
      toast.error("Please provide rejection notes (min 3 chars).");
      return;
    }
    await onConfirm(trimmed);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (busy) return;
        onOpenChange(v);
      }}
    >
      <DialogContent className="bg-slate-900 text-white border-white/20 max-w-lg h-auto max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reject recipient #{recipientId ?? "-"}</DialogTitle>
          <DialogDescription className="text-blue-200">
            Add notes explaining why it was rejected.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <label className="text-sm text-blue-200">Rejection notes</label>
          <textarea
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-blue-300/70 outline-none focus:ring-2 focus:ring-white/10"
            rows={6}
            placeholder='e.g. "Invalid proof"'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={busy}
          />
          <p className="text-xs text-blue-300">Minimum 3 characters.</p>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-transparent border-white/20 text-white"
            disabled={busy}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleSubmit} disabled={!canSubmit}>
            {busy ? "Rejecting..." : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
