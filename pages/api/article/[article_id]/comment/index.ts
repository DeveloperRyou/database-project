import { Comment } from "@/lib/api/comment";
import authGuard from "@/lib/auth/auth-guard";
import getUserId from "@/lib/auth/get-user-id";
import connect from "@/lib/mysql/connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const article_id = req.query.article_id;
  const connection = await connect();
  switch (req.method) {
    case "GET":
      try {
        const [data] = await connection.query(
          "SELECT comment.*, users.name, users.email_id FROM comment JOIN users ON comment.writer_id = users.user_id WHERE article_id = ?",
          [article_id]
        );
        const comments: Comment[] = (data as any[]).map((row) => ({
          comment_id: row.comment_id,
          article_id: row.article_id,
          writer: {
            user_id: row.writer_id,
            name: row.name,
            email_id: row.email_id,
          },
          content: row.content,
          like_count: row.like_count,
          view_count: row.view_count,
          created_at: row.created_at,
          updated_at: row.updated_at,
        }));
        res.status(200).json(comments);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    case "POST":
      if (!authGuard(req, res)) return;
      try {
        const user_id = getUserId(req);
        const [data] = await connection.query(
          "INSERT INTO comment (article_id, writer_id, content) VALUES (?, ?, ?)",
          [article_id, user_id, req.body.content]
        );
        res.status(200).json({});
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
