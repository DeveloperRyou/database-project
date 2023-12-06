import connect from "@/lib/mysql/connect";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await connect();
  switch (req.method) {
    case "POST":
      try {
        const [data] = await connection.query(
          "SELECT * FROM users WHERE email_id = ? AND password = ?",
          [req.body.email_id, req.body.password]
        );
        if ((data as []).length === 0) {
          res.status(401).json({ error: "Invalid credentials" });
          return;
        }
        const accessToken = jwt.sign(
          {
            user_id: data[0].user_id,
            email_id: data[0].email_id,
            name: data[0].name,
            type: data[0].type,
          },
          process.env.JWT_SECRET
        );
        res.status(200).json({
          accessToken,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
