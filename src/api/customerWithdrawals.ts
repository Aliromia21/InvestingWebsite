import { api } from "@/api/client";
import type { ApiResponse } from "@/types/user";
import type { WithdrawalRequest } from "@/types/withdrawal";

export type CreateWithdrawalPayload = {
  amount: string;          // "50.00"
  payout_address: string;  // "USDT_TRON_ADDRESS"
  notes?: string;          // optional
};

export async function createWithdrawalRequest(payload: CreateWithdrawalPayload) {
  const res = await api.post<ApiResponse<WithdrawalRequest>>(
    "customer/withdrawals/request/",
    payload
  );
  return res.data.data;
}

export async function fetchMyWithdrawalRequests() {
  const res = await api.get<ApiResponse<WithdrawalRequest[]>>(
    "customer/withdrawals/requests/"
  );
  return res.data.data ?? [];
}
