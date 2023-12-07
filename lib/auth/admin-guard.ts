import { AbstractUser } from "@/lib/api/users";
import { jwtDecode } from "jwt-decode";
import { NextApiRequest } from "next";

export default function adminGuard(req: NextApiRequest): boolean {
  if (!req.headers.authorization) {
    return false;
  }
  const user = jwtDecode<AbstractUser>(req.headers.authorization);
  if (user.type === 1) return true;
  else return false;
}
