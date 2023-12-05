import ArticlePreview from "./article-preview";
import { Article } from "@/lib/api/article";

type Props = {
  articles: Article[];
};

const MoreStories = ({ articles }: Props) => {
  return (
    <section>
      <h3 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        게시글
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {articles.map((article) => (
          <ArticlePreview article={article} />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
