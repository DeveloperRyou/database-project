import dynamic from "next/dynamic";

const Viewer = dynamic(() => import("@/components/article/article-viewer"), {
  ssr: false,
});

type Props = {
  content: string;
};

const ArticleBody = ({ content }: Props) => {
  return (
    <div className="w-full mx-auto">
      <Viewer initialValue={content} />
    </div>
  );
};

export default ArticleBody;
