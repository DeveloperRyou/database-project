import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function authGuard(req: NextApiRequest, res: NextApiResponse) {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
  }
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    if (typeof decode !== "object") {
      res.status(401).json({ message: "Unauthorized" });
      return false;
    }
    if (decode.exp < Date.now() / 1000) {
      res.status(401).json({ message: "Unauthorized" });
      return false;
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
  }
  return true;
}
