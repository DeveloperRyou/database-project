import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef } from "react";
interface Props {
  onClick: (str: string) => void;
  initialValue?: string;
}
export default function ArticleEditor({ initialValue, onClick }: Props) {
  const editorRef = useRef<any>();
  const onClickSubmit = () => {
    if (!editorRef.current) return;
    onClick(editorRef.current.getInstance().getMarkdown());
  };
  return (
    <div className="flex flex-col gap-4">
      <Editor
        initialValue={initialValue ?? ""}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        ref={editorRef}
        hideModeSwitch={true}
      />
      <button
        onClick={onClickSubmit}
        className="bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
      >
        작성
      </button>
    </div>
  );
}
