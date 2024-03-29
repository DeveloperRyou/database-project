import Head from "next/head";

const Meta = () => {
  return (
    <Head>
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
    </Head>
  );
};

export default Meta;
