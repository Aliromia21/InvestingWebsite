import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw, Sparkles, Eye } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

import {
  fetchAdminInvestments,
  fetchAdminInvestment,
  forcePayoutAdminInvestment,
  type AdminInvestment,
} from "@/api/admin/investments";

function fmtMoney(v: any) {
  const n = typeof v === "number" ? v : parseFloat(String(v ?? ""));
  if (!Number.isFinite(n)) return String(v ?? "0.00");
  return n.toFixed(2);
}

export function InvestmentManagement() {
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [items, setItems] = useState<AdminInvestment[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detail, setDetail] = useState<AdminInvestment | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAdminInvestments();
      setItems(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(String(e?.message || "Failed to load investments"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    const total = items.reduce((sum, it) => sum + (parseFloat(String(it.amount ?? 0)) || 0), 0);
    const count = items.length;
    const uniqueUsers = new Set(items.map((i) => i.user_id).filter(Boolean)).size;
    return { total, count, uniqueUsers };
  }, [items]);

  const openDetail = async (id: number) => {
    setDetailOpen(true);
    setDetailLoading(true);
    setDetail(null);
    try {
      const d = await fetchAdminInvestment(id);
      setDetail(d);
    } catch (e: any) {
      toast.error(String(e?.message || "Failed to load investment"));
    } finally {
      setDetailLoading(false);
    }
  };

  const payout = async (id: number) => {
    const ok = confirm(`Force payout for investment #${id}?`);
    if (!ok) return;

    setMutating(true);
    try {
      const res = await forcePayoutAdminInvestment(id);
      const paid = res?.paid ? `${res.paid} USDT` : "Payout processed";
      toast.success("Payout processed", { description: paid });
      await load();
    } catch (e: any) {
      toast.error(String(e?.message || "Payout failed"));
    } finally {
      setMutating(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <p className="text-white">Loading investments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 space-y-3">
        <p className="text-white">Failed to load investments</p>
        <p className="text-blue-200 text-sm">{error}</p>
        <Button onClick={load} className="bg-white/10 hover:bg-white/20 text-white" disabled={mutating}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <p className="text-blue-200 text-sm mb-1">Total Investments</p>
          <p className="text-white text-2xl">{stats.count}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <p className="text-blue-200 text-sm mb-1">Unique Users</p>
          <p className="text-white text-2xl">{stats.uniqueUsers}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <p className="text-blue-200 text-sm mb-1">Total Invested (approx)</p>
          <p className="text-white text-2xl">{fmtMoney(stats.total)} USDT</p>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white">Investments</h3>
          <p className="text-blue-200 text-sm">List, inspect, and force payout for investments</p>
        </div>
        <Button
          onClick={load}
          variant="outline"
          className="bg-white/10 border-white/20 text-white"
          disabled={mutating}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left text-blue-200 text-sm px-6 py-4">ID</th>
                <th className="text-left text-blue-200 text-sm px-6 py-4">User ID</th>
                <th className="text-left text-blue-200 text-sm px-6 py-4">Amount</th>
                <th className="text-right text-blue-200 text-sm px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((inv) => (
                <tr key={inv.id} className="border-t border-white/10">
                  <td className="px-6 py-4 text-white">#{inv.id}</td>
                  <td className="px-6 py-4 text-white">{inv.user_id ?? "—"}</td>
                  <td className="px-6 py-4 text-white">{fmtMoney(inv.amount)} USDT</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white"
                        onClick={() => openDetail(inv.id)}
                        disabled={mutating}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        onClick={() => payout(inv.id)}
                        disabled={mutating}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Force Payout
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td className="px-6 py-8 text-blue-200" colSpan={4}>
                    No investments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="bg-slate-900 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Investment Details</DialogTitle>
            <DialogDescription className="text-blue-200">
              {detailLoading ? "Loading..." : detail ? `#${detail.id}` : ""}
            </DialogDescription>
          </DialogHeader>

          {detailLoading ? (
            <div className="py-6 text-blue-200">Loading investment...</div>
          ) : detail ? (
            <div className="space-y-2 text-sm">
              {Object.entries(detail).map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-4 border-b border-white/10 py-2">
                  <div className="text-blue-200">{k}</div>
                  <div className="text-white break-all text-right">
                    {typeof v === "object" ? JSON.stringify(v) : String(v)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-blue-200">No data.</div>
          )}

          <DialogFooter>
            <Button
              onClick={() => setDetailOpen(false)}
              variant="outline"
              className="bg-white/10 border-white/20 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
