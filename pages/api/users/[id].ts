import connect from "@/lib/mysql/connect";

export default async function handler(req, res) {
  const id = req.query.id;
  const connection = await connect();
  switch (req.method) {
    case "GET":
      try {
        const [data] = await connection.query(
          "SELECT * FROM users WHERE user_id = ?",
          [id]
        );
        res.status(200).json(data);
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
