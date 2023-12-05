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
}

export async function getCommentByArticleId(article_id: number) {
  const res: AxiosResponse<Comment> = await api.get(
    `/article/${article_id}/comment`
  );
  return res.data;
}

export async function createComment(article_id: number, comment: Comment) {
  const res: AxiosResponse<Comment> = await api.post(
    `/article/${article_id}/comment`,
    comment
  );
  return res.data;
}

export async function updateArticle(
  article_id: number,
  comment_id: number,
  comment: Comment
) {
  const res: AxiosResponse<Comment> = await api.put(
    `/article/${article_id}/comment/${comment_id}`,
    comment
  );
  return res.data;
}

export async function deleteArticle(article_id: number, comment_id: number) {
  const res: AxiosResponse<Comment> = await api.delete(
    `/comment/${article_id}/comment/${comment_id}`
  );
  return res.data;
}
