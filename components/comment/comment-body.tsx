import CommentBodyControl from "@/components/comment/comment-body-control";
import CommentEditor from "@/components/comment/comment-editor";
import Icon from "@/components/icon";
import { Comment, deleteComment } from "@/lib/api/comment";
import {
  createLikeCommentRelation,
  deleteLikeCommentRelation,
  getLikeCommentRelation,
} from "@/lib/api/like";
import { createViewComment } from "@/lib/api/view";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DateFormatter from "../date-formatter";

interface Props {
  article_id: number;
  comment: Comment;
}

export default function CommentBody({ article_id, comment }: Props) {
  const [view, setView] = useState(comment.view_count);
  const [like, setLike] = useState(comment.like_count);
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const onClickView = async () => {
    try {
      if (isExpanded) {
        setIsExpanded(false);
      } else {
        await createViewComment(comment.comment_id);
        setView(view + 1);
        setIsExpanded(true);
      }
    } catch (error) {
      toast.error(error.response.data.error);
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
  const onClickLike = async () => {
    try {
      if (isLiked) {
        await deleteLikeCommentRelation(comment.comment_id);
        setIsLiked(false);
        setLike(like - 1);
      } else {
        await createLikeCommentRelation(comment.comment_id);
        setIsLiked(true);
        setLike(like + 1);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    getLikeCommentRelation(comment.comment_id)
      .then((res) => {
        setIsLiked(res.liked);
      })
      .catch((err) => {});
  }, []);

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
              importance_value={comment.importance_value}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
              onClickView={onClickView}
            />
          </div>
          <div id="collapse-content">
            <div className="flex justify-between mt-2 text-center text-xs">
              <div>{comment.writer.name}</div>
              <div>{DateFormatter({ dateString: comment.created_at })}</div>
            </div>
            <div className="flex justify-center gap-4 mt-2 text-center text-xs">
              <div className="border border-black py-1 px-2">
                <Icon name="view" sz={18} />
                <div>{view}</div>
              </div>
              <div
                className={`border border-black py-1 px-2 cursor-pointer ${
                  isLiked && "bg-red-100"
                }`}
                onClick={onClickLike}
              >
                <Icon name="like" sz={18} />
                <div>{like}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
