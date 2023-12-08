import Head from "next/head";
import Container from "@/components/layout/container";
import Intro from "@/components/intro";
import Layout from "@/components/layout";
import MoreStories from "@/components/article/more-stories";
import { Article, getAllArticles } from "@/lib/api/article";
import DefaultInput from "@/components/default-input";
import { useEffect, useState } from "react";

type Props = {
  allArticles: Article[];
};

export default function Index({ allArticles }: Props) {
  const [articles, setArticles] = useState<Article[]>(allArticles);
  const [filter, setFilter] = useState<
    "latest" | "view" | "like" | "importance"
  >("latest");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (filter === "latest") {
      setArticles(
        allArticles.sort((a, b) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        })
      );
    } else if (filter === "view") {
      setArticles(
        allArticles.sort((a, b) => {
          return b.view_count - a.view_count;
        })
      );
    } else if (filter === "like") {
      setArticles(
        allArticles.sort((a, b) => {
          return b.like_count - a.like_count;
        })
      );
    } else if (filter === "importance") {
      setArticles(
        allArticles.sort((a, b) => {
          return b.importance_value - a.importance_value;
        })
      );
    }
  }, [filter]);

  useEffect(() => {
    if (search === "") {
      setArticles(allArticles);
    } else {
      setArticles(
        allArticles.filter((article) => {
          return article.content.includes(search);
        })
      );
    }
  }, [search]);

  return (
    <>
      <Layout>
        <Head>
          <title>류성민의 database project</title>
        </Head>
        <Container>
          <Intro />
          <h3 className="mb-8 text-3xl md:text-5xl font-bold tracking-tighter leading-tight">
            게시글
          </h3>
          {articles.length > 0 && <MoreStories articles={articles} />}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="h-fit my-auto">검색</div>
              <DefaultInput
                className=" max-w-[200px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                className={`border border-gray-600 px-2 py-1 hover:bg-gray-600 hover:text-white
                 ${filter === "latest" ? "bg-gray-600 text-white" : ""}`}
                onClick={() => setFilter("latest")}
              >
                최신순
              </button>
              <button
                className={`border border-gray-600 px-2 py-1 hover:bg-gray-600 hover:text-white 
                ${filter === "view" ? "bg-gray-600 text-white" : ""}`}
                onClick={() => setFilter("view")}
              >
                조회순
              </button>
              <button
                className={`border border-gray-600 px-2 py-1 hover:bg-gray-600 hover:text-white 
                ${filter === "like" ? "bg-gray-600 text-white" : ""}`}
                onClick={() => setFilter("like")}
              >
                추천순
              </button>
              <button
                className={`border border-gray-600 px-2 py-1 hover:bg-gray-600 hover:text-white 
                ${filter === "importance" ? "bg-gray-600 text-white" : ""}`}
                onClick={() => setFilter("importance")}
              >
                중요도순
              </button>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  const allArticles = await getAllArticles();

  return {
    props: { allArticles },
  };
};
