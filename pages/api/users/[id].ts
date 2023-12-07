import connect from "@/lib/mysql/connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  const connection = await connect();
  switch (req.method) {
    case "GET":
      try {
        const [data] = await connection.query(
          "SELECT * FROM users WHERE user_id = ?",
          [id]
        );
        if ((data as []).length === 0) {
          res.status(404).json({ error: "Not found" });
          return;
        }
        (data as []).forEach((user: any) => {
          delete user.password;
        });
        res.status(200).json(data[0]);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    case "PUT":
      try {
        const [data] = await connection.query(
          "UPDATE users SET ?? = ? WHERE user_id = ?",
          [req.body.key, req.body.value, id]
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
