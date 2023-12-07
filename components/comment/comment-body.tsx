import Avatar from "@/components/avatar";
import DateFormatter from "@/components/date-formatter";
import Icon from "@/components/icon";
import { Comment, deleteComment } from "@/lib/api/comment";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  article_id: number;
  comment: Comment;
}

export default function CommentBody({ article_id, comment }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const onClickView = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
      // view api 호출
    }
  };
  const onClickEdit = () => {};
  const onClickDelete = () => {
    if (confirm("Are you sure you want to delete this comment?"))
      deleteComment(article_id, comment.comment_id)
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
  };
  return (
    <div
      id="comment"
      className="border border-gray-400 mb-2 p-2"
      aria-expanded={isExpanded}
    >
      <div id="static-content" className="flex justify-between">
        <div className="text-sm">
          {isExpanded
            ? comment.content
            : comment.content.substring(0, 5) + "..."}
        </div>

        <div className="flex gap-2">
          <Icon
            name="edit"
            sz={18}
            onClick={onClickEdit}
            className="cursor-pointer"
          />
          <Icon
            name="delete"
            sz={18}
            onClick={onClickDelete}
            className="cursor-pointer"
          />
          <Icon
            name="down-arrow"
            sz={24}
            onClick={onClickView}
            className="arrow cursor-pointer"
          />
        </div>
      </div>
      <div id="collapse-content">
        <div className="flex justify-between mt-2">
          <div className="flex gap-2 text-xs m-auto">
            <div className="h-fit mt-auto">추천하기</div>
            <Icon name="like-1" sz={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
