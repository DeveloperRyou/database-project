import Image from "next/image";

interface Props {
  name: string;
  sz?: number;
  onClick?: () => void;
  className?: string;
}

export default function Icon({ name, sz, onClick, className }: Props) {
  return (
    <div
      className={`flex justify-center items-center ${className}`}
      onClick={onClick}
    >
      <Image src={`/icons/${name}.png`} width={sz} height={sz} alt={name} />
    </div>
  );
}
