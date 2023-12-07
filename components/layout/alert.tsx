import { useAuth } from "@/hooks/useAuth";
import Container from "./container";
import { useRouter } from "next/router";

const Alert = () => {
  const router = useRouter();
  const { auth } = useAuth();
  const logout = () => {
    localStorage.removeItem("accessToken");
    router.reload();
  };
  return (
    <div className="border-b fixed top-0 w-full bg-neutral-200 border-neutral-300 z-[9999]">
      <Container>
        <div className="flex justify-between">
          <div className="h-fit my-auto py-2 text-center text-sm">감쇄율</div>
          <div className="flex gap-2 py-2 text-center text-sm">
            <div className="h-fit my-auto">{auth?.name}</div>
            <div
              className="cursor-pointer text-white bg-black  py-1 px-2"
              onClick={logout}
            >
              로그아웃
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Alert;
