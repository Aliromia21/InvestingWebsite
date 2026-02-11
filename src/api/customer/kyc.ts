import { api } from "@/api/client";

export type CustomerKycStatus = "pending" | "approved" | "rejected";

export type CustomerKyc = {
  id: number;
  user_id: number;
  status: CustomerKycStatus;
  passport_image: string;
  submitted_at: string | null;
  reviewed_at: string | null;
  notes: string | null;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
  errors: any;
};

function apiErr(res: ApiResponse<any>) {
  if (typeof res?.errors?.detail === "string") return res.errors.detail;
  if (typeof res?.message === "string") return res.message;
  return "Request failed";
}

export async function fetchCustomerKyc(): Promise<CustomerKyc | null> {
  const res = await api.get<ApiResponse<CustomerKyc>>("customer/kyc");
  if (!res.data.success) throw new Error(apiErr(res.data));
  return res.data.data ?? null;
}

export async function submitCustomerKyc(params: {
  passportImage?: File | null;
  notes?: string;
}): Promise<CustomerKyc> {
  const fd = new FormData();
  if (params.passportImage) fd.append("passport_image", params.passportImage);
  if (params.notes?.trim()) fd.append("notes", params.notes.trim());

  const res = await api.post<ApiResponse<CustomerKyc>>("customer/kyc/", fd);
  if (!res.data.success) throw new Error(apiErr(res.data));
  if (!res.data.data) throw new Error("Empty response data");
  return res.data.data;
}
