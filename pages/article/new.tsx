import Container from "@/components/container";
import Header from "@/components/header";
import Layout from "@/components/layout";
import dynamic from "next/dynamic";

const ArticleEditor = dynamic(
  () => import("@/components/article/article-editor"),
  {
    ssr: false,
  }
);

export default function Post() {
  return (
    <Layout>
      <Container>
        <Header />
        <ArticleEditor onClick={(str) => console.log(str)} />
      </Container>
    </Layout>
  );
}
