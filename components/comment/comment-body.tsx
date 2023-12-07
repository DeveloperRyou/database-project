import CommentBodyControl from "@/components/comment/comment-body-control";
import CommentEditor from "@/components/comment/comment-editor";
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
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const onClickView = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
      // view api 호출
    }
  };
  const onClickEdit = () => {
    if (isEditing) {
      router.reload();
    } else {
      setIsEditing(true);
    }
  };
  const onClickDelete = () => {
    if (confirm("Are you sure you want to delete this comment?"))
      deleteComment(article_id, comment.comment_id)
        .then(() => {
          router.reload();
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
  };
  const onClickLike = () => {};

  return (
    <div className="mb-2">
      {isEditing ? (
        <CommentEditor
          article_id={article_id}
          comment_id={comment.comment_id}
          initial_content={comment.content}
          callback={onClickEdit}
        />
      ) : (
        <div
          id="comment"
          className="border border-gray-400 p-2"
          aria-expanded={isExpanded}
        >
          <div id="static-content" className="flex justify-between">
            <div className="text-sm">
              {isExpanded
                ? comment.content
                : comment.content.substring(0, 5) + "..."}
            </div>
            <CommentBodyControl
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
              onClickView={onClickView}
            />
          </div>
          <div id="collapse-content">
            <div className="flex justify-between mt-2">
              <div className="flex gap-2 text-xs m-auto">
                <div className="h-fit mt-auto">추천하기</div>
                <Icon name="like-1" sz={24} onClick={onClickLike} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
