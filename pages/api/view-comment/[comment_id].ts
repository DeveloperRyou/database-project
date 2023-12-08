import authGuard from "@/lib/auth/auth-guard";
import connect from "@/lib/mysql/connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const comment_id = req.query.comment_id;
  const connection = await connect();
  switch (req.method) {
    case "POST":
      if (!authGuard(req, res)) return;
      try {
        await connection.query(
          "UPDATE comment SET view_count = view_count + 1 WHERE comment_id = ?",
          [comment_id]
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
