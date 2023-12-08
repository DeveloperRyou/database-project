import { Article } from "@/lib/api/article";
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
  const article_id = req.query.article_id;
  const connection = await connect();
  switch (req.method) {
    case "GET":
      try {
        const [data] = await connection.query(
          "SELECT article.*, users.name, users.email_id FROM article JOIN users ON article.writer_id = users.user_id WHERE article_id = ?",
          [article_id]
        );
        const articles: Article[] = (data as any[]).map((row) => ({
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
        if (articles.length === 0) {
          res.status(404).json({ error: "Article not found" });
          return;
        }
        res.status(200).json(articles[0]);
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
            "UPDATE article SET content = ? WHERE article_id = ?",
            [req.body.content, article_id]
          );
          res.status(200).json({});
          return;
        } else {
          const user_id = getUserId(req);
          const [data] = await connection.query(
            "UPDATE article SET content = ? WHERE article_id = ? AND writer_id = ?",
            [req.body.content, article_id, user_id]
          );
          if ((data as ResultSetHeader).affectedRows === 0) {
            res.status(403).json({ error: "Forbidden user" });
            return;
          }
          res.status(200).json({});
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
          await connection.query("DELETE FROM article WHERE article_id = ?", [
            article_id,
          ]);
          res.status(200).json({});
          return;
        } else {
          const user_id = getUserId(req);
          console.log(user_id, article_id);
          const [data] = await connection.query(
            "DELETE FROM article WHERE article_id = ? AND writer_id = ?",
            [article_id, user_id]
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
