import Container from "@/components/layout/container";
import Header from "@/components/layout/header";
import Layout from "@/components/layout";
import {
  Article,
  createArticle,
  getArticleById,
  updateArticle,
} from "@/lib/api/article";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const ArticleEditor = dynamic(
  () => import("@/components/article/article-editor"),
  {
    ssr: false,
  }
);

type Props = {
  article: Article;
};

export default function Post({ article }: Props) {
  const router = useRouter();
  const onClickSubmit = async (str: string) => {
    try {
      await updateArticle(article.article_id, str);
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.error || "작성에 실패했습니다.");
    }
  };

  return (
    <Layout>
      <Container>
        <Header />
        <ArticleEditor
          onClickSubmit={onClickSubmit}
          initialValue={article.content}
        />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ params }: Params) {
  const article = await getArticleById(params.article_id);
  return {
    props: {
      article: {
        ...article,
      },
    },
  };
}
