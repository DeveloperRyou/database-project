import { signin } from "@/lib/api/users";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SigninModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signin(email, password);
      router.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            id="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">{loading ? "로딩중..." : "로그인"}</button>
        </div>
      </form>
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
