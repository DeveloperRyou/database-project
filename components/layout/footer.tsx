import Link from "next/link";
import Container from "./container";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="flex flex-col gap-6 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
              게시글 작성하기
            </h3>
            <Link
              href="/article/new"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              작성하기
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
              회원정보 수정하기
            </h3>
            <Link
              href="/user"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              수정하기
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
