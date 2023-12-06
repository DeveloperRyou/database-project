import { AbstractUser } from "@/lib/api/users";
import { atom, useAtom } from "jotai";

const authAtom = atom<AbstractUser | null>(null);

interface UseAuthType {
  auth: AbstractUser | null;
  setAuth: (auth: AbstractUser | null) => void;
}

function useAuth(): UseAuthType {
  const [auth, setAuth] = useAtom(authAtom);
  return { auth, setAuth };
}

export { useAuth };
