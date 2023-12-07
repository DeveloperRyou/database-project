import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const ArticleTitle = ({ children }: Props) => {
  return (
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight md:leading-none text-center md:text-left">
      {children}
    </h1>
  );
};

export default ArticleTitle;
