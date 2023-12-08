import connect from "@/lib/mysql/connect";
import paramsData from "@/lib/params";
import { NextApiRequest, NextApiResponse } from "next";

let interval = null;

if (interval === null)
  interval = setInterval(async () => {
    timer--;
    if (timer < 0) {
      const connection = await connect();
      try {
        await connection.beginTransaction();
        await connection.query(
          `UPDATE article SET importance_value = importance_value / ?`,
          [paramsData.decayRate]
        );
        await connection.query(
          `UPDATE comment SET importance_value = importance_value / ?`,
          [paramsData.decayRate]
        );
        await connection.query(
          `DELETE FROM article WHERE importance_value < ?`,
          [paramsData.threshold]
        );
        await connection.query(
          `DELETE FROM comment WHERE importance_value < ?`,
          [paramsData.threshold]
        );
        await connection.commit();
      } catch (error) {
        await connection.rollback();
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
