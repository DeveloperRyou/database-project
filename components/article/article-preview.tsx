import Avatar from "../avatar";
import DateFormatter from "../date-formatter";
import Link from "next/link";
import { Article } from "@/lib/api/article";

interface Props {
  article: Article;
}

const ArticlePreview = ({ article }: Props) => {
  return (
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/articles/${article.article_id}`}
          href="/articles/[article.article_id]"
          className="hover:underline"
        >
          {article.content.substring(0, 10) + "..."}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={article.created_at} />
      </div>
      <Avatar name={article.writer.name} />
    </div>
  );
};

export default ArticlePreview;
