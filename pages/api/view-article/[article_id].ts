import authGuard from "@/lib/auth/auth-guard";
import connect from "@/lib/mysql/connect";
import paramsData from "@/lib/params";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const article_id = req.query.article_id;
  const connection = await connect();
  switch (req.method) {
    case "POST":
      if (!authGuard(req, res)) return;
      try {
        await connection.beginTransaction();
        await connection.query(
          "UPDATE article SET view_count = view_count + 1 WHERE article_id = ?",
          [article_id]
        );
        await connection.query(
          "UPDATE article SET importance_value = importance_value + ? WHERE article_id = ?",
          [paramsData.viewsWeight, article_id]
        );
        await connection.commit();
        res.status(200).json({});
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
