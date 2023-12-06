import { Article } from "@/lib/api/article";
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
        }));
        res.status(200).json(articles[0]);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    case "PUT":
      try {
        const [data] = await connection.query(
          "UPDATE article SET title = ?, content = ?, author = ? WHERE article_id = ?",
          [req.body.title, req.body.content, req.body.author, article_id]
        );
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    case "DELETE":
      try {
        const [data] = await connection.query(
          "DELETE FROM article WHERE article_id = ?",
          [article_id]
        );
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
