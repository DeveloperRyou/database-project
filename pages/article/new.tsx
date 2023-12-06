import Container from "@/components/container";
import Header from "@/components/header";
import Layout from "@/components/layout";
import { createArticle } from "@/lib/api/article";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

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
    } catch (error) {}
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
