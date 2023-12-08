import connect from "@/lib/mysql/connect";
import { NextApiRequest, NextApiResponse } from "next";
import data from "@/parameters.json" assert { type: "json" };

const paramsData = {
  decayPeriod: parseFloat(data.decayPeriod),
  decayRate: parseFloat(data.decayRate),
  threshold: parseFloat(data.threshold),
  viewsWeight: parseFloat(data.viewsWeight),
  clicksWeight: parseFloat(data.clicksWeight),
};

let interval = setInterval(() => {
  timer--;
  if (timer === 0) {
    timer = paramsData.decayPeriod * 24 * 60 * 60;
  }
}, 1000);
let timer = paramsData.decayPeriod * 24 * 60 * 60;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //const connection = await connect();
  switch (req.method) {
    case "GET":
      res.status(200).json({ timer });
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
