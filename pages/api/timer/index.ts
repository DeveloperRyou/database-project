import connect from "@/lib/mysql/connect";
import paramsData from "@/lib/params";
import { NextApiRequest, NextApiResponse } from "next";

let interval = null;

if (interval === null)
  interval = setInterval(async () => {
    timer--;
    if (timer < 0) {
      try {
        const connection = await connect();
        await connection.query(
          `DELETE FROM article WHERE importance_value < ?`,
          [paramsData.threshold]
        );
        await connection.query(
          `DELETE FROM comment WHERE importance_value < ?`,
          [paramsData.threshold]
        );
      } catch (error) {
        console.log(error);
      }
      timer = Math.floor(paramsData.decayPeriod * 24 * 60 * 60);
    }
  }, 1000);
let timer = Math.floor(paramsData.decayPeriod * 24 * 60 * 60);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ timer });
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
