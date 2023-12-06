import PostBody from "@/components/article/article-body";
import PostHeader from "@/components/article/article-header";
import PostTitle from "@/components/article/article-title";
import Container from "@/components/layout/container";
import Header from "@/components/layout/header";
import Layout from "@/components/layout";
import { Article, getArticleById } from "@/lib/api/article";
import { useRouter } from "next/router";

type Props = {
  article: Article;
};

export default function Post({ article }: Props) {
  const router = useRouter();
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <PostHeader article={article} />
              <PostBody content={article.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

type Params = {
  params: {
    article_id: number;
  };
};

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
