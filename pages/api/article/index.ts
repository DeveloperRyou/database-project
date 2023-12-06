import { Article } from "@/lib/api/article";
import connect from "@/lib/mysql/connect";

export default async function handler(req, res) {
  const connection = await connect();
  switch (req.method) {
    case "GET":
      try {
        const [data] = await connection.query(
          "SELECT article.*, users.name, users.email_id FROM article JOIN users ON article.writer_id = users.user_id"
        );
        const article: Article[] = (data as any[]).map((row) => ({
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
        console.log(article);
        res.status(200).json(article);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    case "POST":
      try {
        const content = req.body.content;
        if (!content) {
          res.status(400).json({ error: "content is required" });
          return;
        }
        await connection.beginTransaction();
        await connection.query("INSERT INTO importance () VALUES ()");
        const [importanceData] = await connection.query(
          "SELECT MAX(importance_id) FROM importance"
        );
        console.log(importanceData);
        const importance_id = importanceData[0]["MAX(importance_id)"];
        const [data] = await connection.query(
          "INSERT INTO article (writer_id, importance_id, content) VALUES (?, ?, ?)",
          [1, importance_id, content]
        );
        await connection.commit();
        res.status(200).json(data);
      } catch (error) {
        await connection.rollback();
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
