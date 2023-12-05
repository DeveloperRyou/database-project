import connect from "@/lib/mysql/connect";

export default async function handler(req, res) {
  const article_id = req.query.article_id;
  const connection = await connect();
  switch (req.method) {
    case "GET":
      try {
        const [data] = await connection.query("SELECT * FROM comment");
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "POST":
      try {
        const [data] = await connection.query(
          "INSERT INTO article (title, content, author) VALUES (?, ?, ?)",
          [req.body.title, req.body.content, req.body.author]
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
