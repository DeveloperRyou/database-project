import { signin } from "@/lib/api/users";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
}

export default function SigninModal({ onClose }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signin(email, password);
      localStorage.setItem("accessToken", res.accessToken);
      toast.success("로그인 성공");
      onClose();
      router.push("/");
    } catch (err) {
      toast.error(err.response.data.error || "로그인 실패");
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center h-full">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <input
              className="w-full h-full px-4 py-2 border border-gray-600"
              type="text"
              id="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full h-full px-4 py-2 border border-gray-600"
              type="password"
              id="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black hover:bg-white hover:text-black border border-black text-white py-2 duration-200 transition-colors mb-6 lg:mb-0"
            >
              {loading ? "로딩중..." : "로그인"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
