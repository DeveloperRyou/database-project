import api from "@/lib/api/network";
import { AxiosResponse } from "axios";

export async function getTimer() {
  const res: AxiosResponse<{ timer: number }> = await api.get(`/timer`);
  return res.data;
}

export async function createTimer() {
  const res: AxiosResponse = await api.post(`/timer`);
  return res.data;
}
