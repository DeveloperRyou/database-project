import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import PostBody from "@/components/article/article-body";
import Header from "@/components/header";
import PostHeader from "@/components/article/article-header";
import Layout from "@/components/layout";
import { Article, getArticleById } from "@/lib/api/article";
import PostTitle from "@/components/article/article-title";
import Head from "next/head";
import markdownToHtml from "@/lib/markdownToHtml";

type Props = {
  article: Article;
};

export default function Post({ article }: Props) {
  const router = useRouter();
  if (!router.isFallback) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <PostHeader
                title={article.title}
                coverImage={article.coverImage}
                date={article.date}
                author={article.author}
              />
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

export async function getStaticProps({ params }: Params) {
  const article = await getArticleById(params.article_id);
  const content = await markdownToHtml(article.content || "");

  return {
    props: {
      article: {
        ...article,
        content,
      },
    },
  };
}
