import Icon from "@/components/icon";
import { Article } from "@/lib/api/article";
import {
  createLikeArticleRelation,
  deleteLikeArticleRelation,
  getLikeArticleRelation,
} from "@/lib/api/like";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Viewer = dynamic(() => import("@/components/article/article-viewer"), {
  ssr: false,
});

type Props = {
  article: Article;
};

const ArticleBody = ({ article }: Props) => {
  const [likeCount, setLikeCount] = useState(article.like_count);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    getLikeArticleRelation(article.article_id)
      .then((res) => {
        setIsLiked(res.liked);
      })
      .catch(() => {
        setIsLiked(false);
      });
  }, [article.article_id]);

  const onClickLike = async () => {
    try {
      if (isLiked) {
        await deleteLikeArticleRelation(article.article_id);
        setLikeCount(likeCount - 1);
      } else {
        await createLikeArticleRelation(article.article_id);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
    setIsLiked(!isLiked);
  };
  return (
    <div className="w-full mx-auto">
      <Viewer initialValue={article.content} />
      <div className="w-full flex justify-center gap-4 text-center text-sm">
        <div className="border border-black py-2 px-4">
          <Icon name="view" sz={24} />
          {article.view_count}
        </div>
        <button
          className={`border border-black py-2 px-4 ${isLiked && "bg-red-100"}`}
          onClick={onClickLike}
        >
          <Icon name="like" sz={24} />
          {likeCount}
        </button>
      </div>
    </div>
  );
};

export default ArticleBody;
