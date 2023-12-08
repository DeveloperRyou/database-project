import { Comment } from "@/lib/api/comment";
import adminGuard from "@/lib/auth/admin-guard";
import authGuard from "@/lib/auth/auth-guard";
import getUserId from "@/lib/auth/get-user-id";
import connect from "@/lib/mysql/connect";
import { ResultSetHeader } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const comment_id = req.query.comment_id;
  const connection = await connect();
  switch (req.method) {
    case "GET":
      try {
        const [data] = await connection.query(
          "SELECT comment.*, users.name, users.email_id FROM comment JOIN users ON comment.writer_id = users.user_id WHERE comment_id = ?",
          [comment_id]
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
          importance_value: row.importance_value,
        }));
        if (comments.length === 0) {
          res.status(404).json({ error: "Comment not found" });
          return;
        }
        res.status(200).json(comments[0]);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    case "PUT":
      if (!authGuard(req, res)) return;
      try {
        if (adminGuard(req)) {
          await connection.query(
            "UPDATE comment SET content = ? WHERE comment_id = ?",
            [req.body.content, comment_id]
          );
          res.status(200).json({});
          return;
        } else {
          const user_id = getUserId(req);
          const [data] = await connection.query(
            "UPDATE comment SET content = ? WHERE comment_id = ? AND writer_id = ?",
            [req.body.content, comment_id, user_id]
          );
          if ((data as ResultSetHeader).affectedRows === 0) {
            res.status(403).json({ error: "Forbidden user" });
            return;
          }
          res.status(200).json({});
          return;
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    case "DELETE":
      if (!authGuard(req, res)) return;
      try {
        if (adminGuard(req)) {
          await connection.query("DELETE FROM comment WHERE comment_id = ?", [
            comment_id,
          ]);
          res.status(200).json({});
          return;
        } else {
          const user_id = getUserId(req);
          const [data] = await connection.query(
            "DELETE FROM comment WHERE comment_id = ? AND writer_id = ?",
            [comment_id, user_id]
          );
          if ((data as ResultSetHeader).affectedRows === 0) {
            res.status(403).json({ error: "Forbidden user" });
            return;
          }
          res.status(200).json({});
          return;
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
