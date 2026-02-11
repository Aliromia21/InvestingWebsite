import { adminApi } from "../adminApi";

export async function createAdminMessage(payload: {
  subject: string;
  body: string;
  reward: string;
  user_id: number; 
}) {
  const res = await adminApi.post("/admin/messages/", payload);
  return res.data;
}
