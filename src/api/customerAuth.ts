import { api } from "@/api/client";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors: any;
};

export type RegisterPayload = {
  email: string;
  password: string;
  full_name: string;
  country: string; 
  phone: string;
  referral_code?: string; // optional
};

export async function registerCustomer(payload: RegisterPayload) {
  const res = await api.post<ApiResponse<any>>("customer/register/", payload);
  return res.data;
}

export async function sendResetOtp(email: string) {
  const res = await api.post<ApiResponse<{ sent: boolean }>>(
    "customer/password/reset/send-otp/",
    { email }
  );
  return res.data;
}


export async function verifyResetOtp(email: string, otp: string) {
  const res = await api.post<ApiResponse<{ verified: boolean }>>(
    "customer/password/reset/verify-otp/",
    { email, otp }
  );
  return res.data;
}

export async function changePassword(payload: {
  email: string;
  new_password: string;
  confirm_password: string;
}) {
  const res = await api.post<ApiResponse<{ changed: boolean }>>(
    "customer/password/reset/change/",
    payload
  );
  return res.data;
}
