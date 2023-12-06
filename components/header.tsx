import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mt-24 mb-16">
      <Link href="/" className="hover:underline">
        Home 으로
      </Link>
      .
    </h2>
  );
};

export default Header;
