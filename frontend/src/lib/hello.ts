import { api } from "@/lib/api";

export const getHello = async () => {
  const res = await api.get("/");
  return res.data;
};
