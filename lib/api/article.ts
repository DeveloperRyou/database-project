import api from "@/lib/api/network";
import { AbstractUser } from "@/lib/api/users";
import { AxiosResponse } from "axios";

interface Article {
  article_id: number;
  writer: AbstractUser;
  content: string;
  like_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export async function getAllArticles() {
  const res: AxiosResponse<Article[]> = await api.get("/article");
  return res.data;
}

export async function getArticleById(article_id: number) {
  const res: AxiosResponse<Article> = await api.get(`/article/${article_id}`);
  return res.data;
}

export async function createArticle(content: string) {
  const res: AxiosResponse = await api.post("/article", { content });
  return res.data;
}

export async function updateArticle(article_id: number, content: string) {
  const res: AxiosResponse = await api.put(`/article/${article_id}`, {
    content,
  });
  return res.data;
}

export async function deleteArticle(article_id: number) {
  const res: AxiosResponse = await api.delete(`/article/${article_id}`);
  return res.data;
}

export type { Article };
