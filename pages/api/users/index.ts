import connect from "@/lib/mysql/connect";

export default async function handler(req, res) {
  const connection = await connect();
  switch (req.method) {
    case "GET":
      try {
        const [data] = await connection.query("SELECT * FROM users");
        console.log(data);
        res.status(200).json();
        break;
      } catch (error) {
        res.status(500).json({ error: error.message });
        break;
      }
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
