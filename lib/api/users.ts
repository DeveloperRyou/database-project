import { DateFormatterForDB } from "@/components/date-formatter";
import api from "@/lib/api/network";
import { AxiosResponse } from "axios";

interface AbstractUser {
  user_id: number;
  name: string;
  email_id: string;
  type?: number;
}

interface User extends AbstractUser {
  type?: number;
  birth?: string;
  sex?: number;
  address?: string;
  phone?: string;
}

export async function getAllUsers() {
  const res: AxiosResponse<User[]> = await api.get("/users");
  return res.data;
}

export async function getUserbyId(user_id: number) {
  const res: AxiosResponse<User> = await api.get(`/users/${user_id}`);
  return res.data;
}

export async function updateUser(
  user_id: number,
  name: string | null,
  birth: string | null,
  sex: 0 | 1 | null,
  address: string | null,
  phone: string | null
) {
  const res: AxiosResponse = await api.put(`/users/${user_id}`, {
    name,
    birth: birth ? DateFormatterForDB({ dateString: birth }) : null,
    phone,
    sex,
    address,
  });
  return res.data;
}

export async function signin(email_id: string, password: string) {
  const res: AxiosResponse = await api.post("/signin", {
    email_id,
    password,
  });
  return res.data;
}

export async function checkSignin() {
  const res: AxiosResponse<{}> = await api.get("/signin/check");
  return res.data;
}

export type { AbstractUser, User };
