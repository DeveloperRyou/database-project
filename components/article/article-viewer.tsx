import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { useRef } from "react";
interface Props {
  initialValue?: string;
}
export default function ArticleViewer({ initialValue }: Props) {
  const viewerRef = useRef<any>();
  return <Viewer initialValue={initialValue ?? ""} ref={viewerRef} />;
}
