import ArticleBody from "@/components/article/article-body";
import ArticleHeader from "@/components/article/article-header";
import ArticleTitle from "@/components/article/article-title";
import Container from "@/components/layout/container";
import Header from "@/components/layout/header";
import Layout from "@/components/layout";
import { Article, getArticleById } from "@/lib/api/article";
import { useRouter } from "next/router";
import CommentBody from "@/components/comment/comment-body";
import { useEffect, useState } from "react";
import {
  Comment,
  createComment,
  getCommentByArticleId,
} from "@/lib/api/comment";
import { toast } from "react-toastify";
import CommentEditor from "@/components/comment/comment-editor";

type Props = {
  article: Article;
};

export default function Home({ article }: Props) {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const router = useRouter();

  const updateCommentList = () => {
    getCommentByArticleId(article.article_id)
      .then((res) => {
        setCommentList(res);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  useEffect(() => {
    if (article) {
      updateCommentList();
    }
  }, [article]);

  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <ArticleTitle>Loading…</ArticleTitle>
        ) : (
          <>
            <article className="mb-32">
              <ArticleHeader article={article} />
              <ArticleBody article={article} />
            </article>
            <article className="mb-32">
              {commentList.map((comment, idx) => (
                <CommentBody
                  key={idx}
                  article_id={article.article_id}
                  comment={comment}
                />
              ))}
              <CommentEditor
                article_id={article.article_id}
                callback={updateCommentList}
              />
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
  try {
    const article = await getArticleById(params.article_id);
    return {
      props: {
        article: {
          ...article,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
