import { AbstractUser } from "@/lib/api/users";
import { jwtDecode } from "jwt-decode";
import { NextApiRequest } from "next";

export default function getUserId(req: NextApiRequest): number | null {
  if (!req.headers.authorization) {
    return null;
  }
  const user = jwtDecode<AbstractUser>(req.headers.authorization);
  return user.user_id;
}
