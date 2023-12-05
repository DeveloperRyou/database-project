import Avatar from "../avatar";
import DateFormatter from "../date-formatter";
import CoverImage from "../cover-image";
import ArticleTitle from "./article-title";
import { Article } from "@/lib/api/article";

type Props = {
  article: Article;
};

const ArticleHeader = ({ article }: Props) => {
  return (
    <>
      <ArticleTitle>{article.content.substring(0, 10) + "..."}</ArticleTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={article.writer.name} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
};

export default ArticleHeader;
