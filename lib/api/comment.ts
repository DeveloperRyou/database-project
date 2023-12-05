import axios, { AxiosResponse } from "axios";

interface Comment {
  comment_id: number;
  article_id: number;
  writer_id: number;
  content: string;
  like_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export async function getCommentByArticleId(article_id: number) {
  const res: AxiosResponse<Comment> = await axios.get(
    `/api/article/${article_id}/comment`
  );
  return res.data;
}

export async function createComment(article_id: number, comment: Comment) {
  const res: AxiosResponse<Comment> = await axios.post(
    `/api/article/${article_id}/comment`,
    comment
  );
  return res.data;
}

export async function updateArticle(
  article_id: number,
  comment_id: number,
  comment: Comment
) {
  const res: AxiosResponse<Comment> = await axios.put(
    `/api/article/${article_id}/comment/${comment_id}`,
    comment
  );
  return res.data;
}

export async function deleteArticle(article_id: number, comment_id: number) {
  const res: AxiosResponse<Comment> = await axios.delete(
    `/api/comment/${article_id}/comment/${comment_id}`
  );
  return res.data;
}
