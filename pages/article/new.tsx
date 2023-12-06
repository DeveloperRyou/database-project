import Container from "@/components/container";
import Header from "@/components/header";
import Layout from "@/components/layout";
import { createArticle } from "@/lib/api/article";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ArticleEditor = dynamic(
  () => import("@/components/article/article-editor"),
  {
    ssr: false,
  }
);

export default function Post() {
  const router = useRouter();
  const onClickSubmit = async (str: string) => {
    try {
      await createArticle(str);
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.error || "작성에 실패했습니다.");
    }
  };

  return (
    <Layout>
      <Container>
        <Header />
        <ArticleEditor onClickSubmit={onClickSubmit} />
      </Container>
    </Layout>
  );
}
