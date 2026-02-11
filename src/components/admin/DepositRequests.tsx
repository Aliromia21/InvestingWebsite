import { useCallback, useEffect, useMemo, useState } from "react";
import { DollarSign, Check, X, Eye, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

import {
  fetchDepositRequests,
  approveDepositRequest,
  rejectDepositRequest,
  type AdminDepositRequest,
} from "@/api/adminDeposits";

type DepositRow = {
  id: number;
  userName: string;
  email: string;
  amount: number;
  txHash: string;
  walletAddress: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected" | string;
};

function toNumber(v: any, fallback = 0) {
  const n = typeof v === "number" ? v : parseFloat(String(v ?? ""));
  return Number.isFinite(n) ? n : fallback;
}

function formatDateTime(isoOrStr: string) {
  const d = new Date(isoOrStr);
  if (Number.isNaN(d.getTime())) return isoOrStr;
  return d.toLocaleString();
}

function mapApiToRow(x: AdminDepositRequest): DepositRow {
  const fullName =
    x.user?.full_name ||
    `${x.user?.first_name ?? ""} ${x.user?.last_name ?? ""}`.trim() ||
    `User #${x.user?.id ?? x.user_id ?? "—"}`;

  return {
    id: x.id,
    userName: fullName,
    email: x.user?.email ?? "—",
    amount: toNumber(x.amount, 0),
    txHash: x.tx_hash ?? "",
    walletAddress: x.wallet_address ?? "",
    submittedDate: formatDateTime(x.created_at ?? ""),
    status: x.status ?? "pending",
  };
}

export function DepositRequests() {
  const [items, setItems] = useState<DepositRow[]>([]);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<DepositRow | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [actionLoading, setActionLoading] = useState<
    "approve" | "reject" | null
  >(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await fetchDepositRequests();
      setItems(list.map(mapApiToRow));
    } catch (e: any) {
      toast.error("Failed to load deposit requests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const pending = useMemo(
    () => items.filter((d) => String(d.status).toLowerCase() === "pending"),
    [items]
  );

  const totalPendingAmount = useMemo(
    () => pending.reduce((sum, d) => sum + d.amount, 0),
    [pending]
  );

  const handleView = (row: DepositRow) => {
    setSelected(row);
    setDialogOpen(true);
  };

  const handleApprove = async () => {
    if (!selected) return;

    setActionLoading("approve");
    try {
      await approveDepositRequest(selected.id);

      // تحديث محلي سريع
      setItems((prev) =>
        prev.map((x) =>
          x.id === selected.id ? { ...x, status: "approved" } : x
        )
      );

      toast.success("Deposit approved and credited");
      setDialogOpen(false);
      setSelected(null);
    } catch (e: any) {
      toast.error("Approve failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!selected) return;

    setActionLoading("reject");
    try {
      await rejectDepositRequest(selected.id);

      setItems((prev) =>
        prev.map((x) =>
          x.id === selected.id ? { ...x, status: "rejected" } : x
        )
      );

      toast.success("Deposit rejected");
      setDialogOpen(false);
      setSelected(null);
    } catch (e: any) {
      toast.error("Reject failed");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <p className="text-blue-200 text-sm mb-1">Pending Requests</p>
          <p className="text-white text-2xl">{pending.length}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <p className="text-blue-200 text-sm mb-1">Pending Amount</p>
          <p className="text-white text-2xl">
            {totalPendingAmount.toLocaleString()} USDT
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-sm mb-1">Total Requests</p>
            <p className="text-white text-2xl">{items.length}</p>
          </div>
          <Button
            onClick={load}
            disabled={loading}
            variant="outline"
            className="bg-white/10 border-white/20"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Pending Deposits */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white">Pending Deposit Requests</h3>
          {loading && <p className="text-blue-200 text-sm">Loading…</p>}
        </div>

        {pending.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="w-16 h-16 text-blue-400/30 mx-auto mb-4" />
            <p className="text-blue-200">No pending deposit requests</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map((deposit) => (
              <div
                key={deposit.id}
                className="bg-white/5 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>

                  <div>
                    <p className="text-white">{deposit.userName}</p>
                    <p className="text-blue-300 text-sm">{deposit.email}</p>
                    <p className="text-blue-400 text-xs font-mono mt-1">
                      TX: {deposit.txHash ? `${deposit.txHash.substring(0, 20)}...` : "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right mr-4">
                    <p className="text-white">{deposit.amount.toLocaleString()} USDT</p>
                    <p className="text-blue-300 text-sm">{deposit.submittedDate}</p>
                  </div>

                  <Button
                    onClick={() => handleView(deposit)}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-slate-900 text-white border-white/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Deposit Request</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-6">
              {/* User Info */}
              <div className="bg-white/5 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-blue-200 text-sm mb-1">User Name</p>
                    <p className="text-white">{selected.userName}</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Email</p>
                    <p className="text-white">{selected.email}</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Amount</p>
                    <p className="text-white text-xl">
                      {selected.amount.toLocaleString()} USDT
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Submitted</p>
                    <p className="text-white">{selected.submittedDate}</p>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-blue-200 text-sm mb-2">Transaction Hash</p>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-white font-mono text-sm break-all">
                      {selected.txHash || "—"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-blue-200 text-sm mb-2">Platform Wallet Address</p>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-white font-mono text-sm break-all">
                      {selected.walletAddress || "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    selected.txHash &&
                    window.open(
                      `https://tronscan.org/#/transaction/${selected.txHash}`,
                      "_blank"
                    )
                  }
                  disabled={!selected.txHash}
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/20"
                >
                  View on Blockchain
                </Button>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              onClick={() => setDialogOpen(false)}
              variant="outline"
              className="bg-transparent border-white/20"
            >
              Cancel
            </Button>

            <Button
              onClick={handleReject}
              disabled={!selected || actionLoading !== null}
              className="bg-red-500 hover:bg-red-600"
            >
              <X className="w-4 h-4 mr-2" />
              {actionLoading === "reject" ? "Rejecting..." : "Reject"}
            </Button>

            <Button
              onClick={handleApprove}
              disabled={!selected || actionLoading !== null}
              className="bg-green-500 hover:bg-green-600"
            >
              <Check className="w-4 h-4 mr-2" />
              {actionLoading === "approve" ? "Approving..." : "Approve & Credit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
