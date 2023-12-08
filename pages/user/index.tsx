import { DateFormatterForDB } from "@/components/date-formatter";
import DefaultInput from "@/components/default-input";
import Layout from "@/components/layout";
import Container from "@/components/layout/container";
import Header from "@/components/layout/header";
import { useAuth } from "@/hooks/useAuth";
import { User, getUserbyId, updateUser } from "@/lib/api/users";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const userInfo: { [key: string]: string } = {
  user_id: "User_id",
  email_id: "Email_id",
  type: "타입",
  name: "이름",
  birth: "생년월일",
  phone: "전화번호",
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
      .then((res: any) => {
        console.log(res);
        res.type = res.type === 0 ? "유저" : "어드민";
        res.sex = res.sex === 0 ? "남자" : "여자";
        res.birth = DateFormatterForDB({ dateString: res.birth });
        setUser(res);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }, [auth]);

  const onClickSave = () => {
    let sex;
    if ((user.sex as any) === "남자") sex = 0;
    else if ((user.sex as any) === "여자") sex = 1;
    else sex = null;

    updateUser(
      user.user_id,
      user.name,
      user.birth,
      sex,
      user.address,
      user.phone
    )
      .then(() => {
        toast.success("저장되었습니다.");
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

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
                value={user?.[info]}
                disabled={
                  info === "email_id" || info === "type" || info === "user_id"
                }
                onChange={(e) => {
                  setUser({ ...user, [info]: e.target.value });
                }}
              />
            </div>
          );
        })}
        <div className="flex w-full">
          <button
            className="mt-4 ml-auto bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            onClick={onClickSave}
          >
            저장하기
          </button>
        </div>
      </Container>
    </Layout>
  );
}
