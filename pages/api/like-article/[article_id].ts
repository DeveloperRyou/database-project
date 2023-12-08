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
      if (!authGuard(req, res)) return;
      try {
        const user_id = getUserId(req);
        const [data] = await connection.query(
          "SELECT * FROM like_article_relation WHERE user_id = ? AND article_id = ?",
          [user_id, article_id]
        );
        res.status(200).json({ liked: (data as any[]).length > 0 });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    case "POST":
      if (!authGuard(req, res)) return;
      try {
        const user_id = getUserId(req);
        await connection.query(
          "INSERT INTO like_article_relation (user_id, article_id) VALUES (?, ?)",
          [user_id, article_id]
        );
        await connection.query(
          "UPDATE article SET like_count = like_count + 1 WHERE article_id = ?",
          [article_id]
        );
        res.status(200);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    case "DELETE":
      if (!authGuard(req, res)) return;
      try {
        const user_id = getUserId(req);
        await connection.query(
          "DELETE FROM like_article_relation WHERE user_id = ? AND article_id = ?",
          [user_id, article_id]
        );
        await connection.query(
          "UPDATE article SET like_count = like_count - 1 WHERE article_id = ?",
          [article_id]
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
