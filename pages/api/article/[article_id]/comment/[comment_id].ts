import connect from "@/lib/mysql/connect";

export default async function handler(req, res) {
  const comment_id = req.query.comment_id;
  const connection = await connect();
  switch (req.method) {
    case "GET":
      try {
        const [data] = await connection.query(
          "SELECT * FROM comment WHERE comment_id = ?",
          [comment_id]
        );
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "PUT":
      try {
        const [data] = await connection.query(
          "UPDATE comment SET title = ?, content = ?, author = ? WHERE comment_id = ?",
          [req.body.title, req.body.content, req.body.author, comment_id]
        );
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "DELETE":
      try {
        const [data] = await connection.query(
          "DELETE FROM comment WHERE comment_id = ?",
          [comment_id]
        );
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
