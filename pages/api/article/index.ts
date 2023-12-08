import { Article } from "@/lib/api/article";
import authGuard from "@/lib/auth/auth-guard";
import getUserId from "@/lib/auth/get-user-id";
import connect from "@/lib/mysql/connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await connect();
  switch (req.method) {
    case "GET":
      try {
        const [data] = await connection.query(
          "SELECT article.*, users.name, users.email_id FROM article JOIN users ON article.writer_id = users.user_id"
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
        }));
        res.status(200).json(articles);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    case "POST":
      if (!authGuard(req, res)) return;
      try {
        const user_id = getUserId(req);
        const content = req.body.content;
        if (!content) {
          res.status(400).json({ error: "content is required" });
          return;
        }
        const [data] = await connection.query(
          "INSERT INTO article (writer_id, content) VALUES (?, ?)",
          [user_id, content]
        );
        res.status(200);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
