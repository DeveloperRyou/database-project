import Layout from "@/components/layout";
import Container from "@/components/layout/container";
import Header from "@/components/layout/header";
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>류성민의 database project</title>
        </Head>
        <Container>
          <Header />
          <div className="pt-36 text-center">
            <h1 className="text-9xl">404</h1>
            <h2 className="mt-8 text-4xl">Not Found</h2>
          </div>
        </Container>
      </Layout>
    </>
  );
}
