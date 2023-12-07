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
        const [data] = await connection.query("SELECT * FROM users");
        (data as []).forEach((user: any) => {
          delete user.password;
        });
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
