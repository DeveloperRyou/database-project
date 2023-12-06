import ArticlePreview from "./article-preview";
import { Article } from "@/lib/api/article";

type Props = {
  articles: Article[];
};

const MoreStories = ({ articles }: Props) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {articles.map((article, idx) => (
          <ArticlePreview key={idx} article={article} />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
