import { Article } from "@/lib/api/article";
import Avatar from "../avatar";
import DateFormatter from "../date-formatter";
import ArticleTitle from "./article-title";

type Props = {
  article: Article;
};

const ArticleHeader = ({ article }: Props) => {
  return (
    <>
      <ArticleTitle>{article.content.substring(0, 20) + "..."}</ArticleTitle>
      <div className="flex w-full mx-auto justify-between mb-8">
        <div>
          <Avatar name={article.writer.name} />
        </div>
        <div className="text-lg">
          <DateFormatter dateString={article.created_at} />
        </div>
      </div>
    </>
  );
};

export default ArticleHeader;
