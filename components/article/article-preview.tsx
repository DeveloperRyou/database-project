import Avatar from "../avatar";
import DateFormatter from "../date-formatter";
import Link from "next/link";
import { Article } from "@/lib/api/article";
import { createViewArticle } from "@/lib/api/view";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface Props {
  article: Article;
}

const ArticlePreview = ({ article }: Props) => {
  const router = useRouter();
  const onClickArticle = async () => {
    try {
      await createViewArticle(article.article_id);
      router.push(`/article/${article.article_id}`);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-3xl mb-3 leading-snug">
          <div
            className="cursor-pointer hover:underline w-fit"
            onClick={onClickArticle}
          >
            {article.content.substring(0, 10) + "..."}
          </div>
        </h3>
        <div className="h-fit my-auto text-sm">
          중요도 : {article.importance_value}
        </div>
      </div>
      <div className="flex w-full justify-between text-lg mb-4">
        <Avatar name={article.writer.name} />
        <DateFormatter dateString={article.created_at} />
      </div>
    </div>
  );
};

export default ArticlePreview;
