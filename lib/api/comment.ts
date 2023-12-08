import api from "@/lib/api/network";
import { User } from "@/lib/api/users";
import { AxiosResponse } from "axios";

interface Comment {
  comment_id: number;
  article_id: number;
  writer: User;
  content: string;
  like_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  importance_value: number;
}

export async function getCommentByArticleId(article_id: number) {
  const res: AxiosResponse<Comment[]> = await api.get(
    `/article/${article_id}/comment`
  );
  return res.data;
}

export async function createComment(article_id: number, content: string) {
  const res: AxiosResponse = await api.post(`/article/${article_id}/comment`, {
    content,
  });
  return res.data;
}

export async function updateComment(
  article_id: number,
  comment_id: number,
  content: string
) {
  const res: AxiosResponse = await api.put(
    `/article/${article_id}/comment/${comment_id}`,
    { content }
  );
  return res.data;
}

export async function deleteComment(article_id: number, comment_id: number) {
  const res: AxiosResponse = await api.delete(
    `/article/${article_id}/comment/${comment_id}`
  );
  return res.data;
}

export type { Comment };
