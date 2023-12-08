import api from "@/lib/api/network";
import { AxiosResponse } from "axios";

export async function getLikeArticleRelation(article_id: number) {
  const res: AxiosResponse<{ liked: boolean }> = await api.get(
    `/like-article/${article_id}`
  );
  return res.data;
}

export async function createLikeArticleRelation(article_id: number) {
  const res: AxiosResponse = await api.post(`/like-article/${article_id}`, {});
  return res.data;
}

export async function deleteLikeArticleRelation(article_id: number) {
  const res: AxiosResponse = await api.delete(`/like-article/${article_id}`);
  return res.data;
}

export async function getLikeCommentRelation(comment_id: number) {
  const res: AxiosResponse<{ liked: boolean }> = await api.get(
    `/like-comment/${comment_id}`
  );
  return res.data;
}

export async function createLikeCommentRelation(comment_id: number) {
  const res: AxiosResponse = await api.post(`/like-comment/${comment_id}`, {});
  return res.data;
}

export async function deleteLikeCommentRelation(comment_id: number) {
  const res: AxiosResponse = await api.delete(`/like-comment/${comment_id}`);
  return res.data;
}
