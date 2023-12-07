import DefaultInput from "@/components/default-input";
import Layout from "@/components/layout";
import Container from "@/components/layout/container";
import Header from "@/components/layout/header";
import { useAuth } from "@/hooks/useAuth";
import { User, getUserbyId } from "@/lib/api/users";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const userInfo: { [key: string]: string } = {
  user_id: "User_id",
  email_id: "Email_id",
  type: "타입",
  name: "이름",
  birth: "생년월일",
  phone_number: "전화번호",
  sex: "성별",
  address: "주소",
};

export default function Home() {
  const { auth } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    if (!router.isReady) return;
    if (auth === null) {
      router.push("/");
      return;
    }
    getUserbyId(auth.user_id)
      .then((res) => {
        console.log(res);
        setUser(res);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }, [auth]);

  return (
    <Layout>
      <Container>
        <Header />
        <h3 className="mb-8 text-3xl md:text-5xl font-bold tracking-tighter leading-tight">
          유저 정보
        </h3>
        {Object.keys(userInfo).map((info) => {
          return (
            <div className="flex mb-2">
              <div className="h-fit my-auto w-1/4">{userInfo[info]}</div>
              <DefaultInput
                type="text"
                value={
                  info === "type"
                    ? user?.type === 0
                      ? "유저"
                      : "어드민"
                    : user?.[info]
                }
                disabled={
                  info === "email_id" || info === "type" || info === "user_id"
                }
              />
            </div>
          );
        })}
      </Container>
    </Layout>
  );
}
