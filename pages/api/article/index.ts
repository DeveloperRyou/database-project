import connect from "@/lib/mysql/connect";

export default async function handler(req, res) {
  const connection = await connect();
  switch (req.method) {
    case "GET":
      try {
        const [data] = await connection.query("SELECT * FROM article");
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "POST":
      try {
        const content = req.body.content;
        if (!content) {
          res.status(400).json({ error: "content is required" });
          return;
        }
        await connection.beginTransaction();
        await connection.query("INSERT INTO importance () VALUES ()");
        const [importanceData] = await connection.query(
          "SELECT MAX(importance_id) FROM importance"
        );
        console.log(importanceData);
        const importance_id = importanceData[0]["MAX(importance_id)"];
        const [data] = await connection.query(
          "INSERT INTO article (writer_id, importance_id, content) VALUES (?, ?, ?)",
          [1, importance_id, content]
        );
        await connection.commit();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
