import connect from "@/lib/mysql/connect";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const connection = await connect();
  switch (req.method) {
    case "POST":
      try {
        const [data] = await connection.query(
          "SELECT * FROM users WHERE user_id = ? AND password = ?",
          [req.body.user_id, req.body.password]
        );
        if ((data as []).length === 0) {
          res.status(401).json({ error: "Invalid credentials" });
          return;
        }
        const token = jwt.sign(
          { user_id: data[0].user_id, type: data[0].type },
          process.env.JWT_SECRET
        );
        res.status(200).json(token);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "sql error" });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
