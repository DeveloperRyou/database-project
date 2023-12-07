import { createComment } from "@/lib/api/comment";
import { useState } from "react";
import { toast } from "react-toastify";
interface Props {
  article_id: number;
  initial_content?: string;
  callback?: () => void;
}

export default function CommentEditor({
  article_id,
  initial_content,
  callback,
}: Props) {
  const [value, setValue] = useState(initial_content || "");

  const onSubmitComment = (content: string) => {
    createComment(article_id, content)
      .then(() => {
        callback && callback();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onClick = () => {
    onSubmitComment(value);
    setValue("");
  };
  return (
    <div className="flex gap-4 w-full h-[100px]">
      <textarea
        className="w-full h-full p-2 border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
        value={value}
        onChange={onChange}
      />
      <button
        className="h-full px-4 py-2 text-white bg-indigo-700 hover:bg-indigo-900"
        onClick={onClick}
      >
        Submit
      </button>
    </div>
  );
}
