import { Article, deleteArticle } from "@/lib/api/article";
import Avatar from "../avatar";
import DateFormatter from "../date-formatter";
import ArticleTitle from "./article-title";
import Icon from "@/components/icon";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type Props = {
  article: Article;
};

const ArticleHeader = ({ article }: Props) => {
  const router = useRouter();
  const onClickEdit = () => {
    router.push(`/article/${article.article_id}/edit`);
  };
  const onClickDelete = () => {
    if (confirm("Are you sure you want to delete this article?"))
      deleteArticle(article.article_id)
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
  };
  return (
    <>
      <div className="flex justify-between mb-6">
        <ArticleTitle>{article.content.substring(0, 20) + "..."}</ArticleTitle>
        <div className="flex gap-2">
          <div className="text-sm h-fit my-auto">
            중요도 : {article.importance_value}
          </div>
          <Icon
            name="edit"
            sz={24}
            className="cursor-pointer"
            onClick={onClickEdit}
          />
          <Icon
            name="delete"
            sz={24}
            className="cursor-pointer"
            onClick={onClickDelete}
          />
        </div>
      </div>
      <div className="flex w-full mx-auto justify-between mb-8">
        <div>
          <Avatar name={article.writer.name} />
        </div>
        <div className="text-sm">
          <DateFormatter dateString={article.created_at} />
        </div>
      </div>
    </>
  );
};

export default ArticleHeader;
