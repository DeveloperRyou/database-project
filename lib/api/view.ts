import api from "@/lib/api/network";
import { AxiosResponse } from "axios";

export async function createViewArticle(article_id: number) {
  const res: AxiosResponse = await api.post(`/view-article/${article_id}`, {});
  return res.data;
}

export async function createViewComment(comment_id: number) {
  const res: AxiosResponse = await api.post(`/view-comment/${comment_id}`, {});
  return res.data;
}
