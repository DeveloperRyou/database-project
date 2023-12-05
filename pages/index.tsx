import Head from "next/head";
import Container from "@/components/container";
import Intro from "@/components/intro";
import Layout from "@/components/layout";
import MoreStories from "@/components/article/more-stories";
import { Article, getAllArticles } from "@/lib/api/article";

type Props = {
  allArticles: Article[];
};

export default function Index({ allArticles }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>류성민의 database project</title>
        </Head>
        <Container>
          <Intro />
          {allArticles.length > 0 && <MoreStories articles={allArticles} />}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allArticles = await getAllArticles();

  return {
    props: { allArticles },
  };
};
