import axios, { AxiosResponse } from "axios";

interface Article {
  article_id: number;
  writer_id: number;
  content: string;
  like_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export async function getAllArticles() {
  const res: AxiosResponse<Article[]> = await axios.get("/api/article");
  return res.data;
}

export async function getArticleById(id: string) {
  const res: AxiosResponse<Article> = await axios.get(`/api/article/${id}`);
  return res.data;
}

export async function createArticle(article: Article) {
  const res: AxiosResponse<Article> = await axios.post("/api/article", article);
  return res.data;
}

export async function updateArticle(id: string, article: Article) {
  const res: AxiosResponse<Article> = await axios.put(
    `/api/article/${id}`,
    article
  );
  return res.data;
}

export async function deleteArticle(id: string) {
  const res: AxiosResponse<Article> = await axios.delete(`/api/article/${id}`);
  return res.data;
}

export type { Article };
