import { useAuth } from "@/hooks/useAuth";
import Container from "./container";
import { useRouter } from "next/router";
import { useParams } from "@/hooks/useParams";

const Alert = () => {
  const router = useRouter();
  const { auth } = useAuth();
  const { params, remainingTime } = useParams();
  const logout = () => {
    localStorage.removeItem("accessToken");
    router.reload();
  };
  return (
    <div className="border-b fixed top-0 w-full bg-neutral-200 border-neutral-300 z-[9999]">
      <Container>
        <div className="flex justify-between">
          <div className="flex gap-2 text-center text-sm">
            <div className="h-fit my-auto py-2">
              감쇄까지
              {" " + Math.floor(remainingTime / 86400)}일
              {" " + Math.floor((remainingTime % 86400) / 3600)}시간
              {" " + Math.floor((remainingTime % 3600) / 60)}분
              {" " + (remainingTime % 60)}초 / 감쇄율 : {params.decayRate} /
              임계치 : {params.threshold} / 조회수 가중치 : {params.viewsWeight}{" "}
              / 추천수 가중치 : {params.clicksWeight}
            </div>
          </div>
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
