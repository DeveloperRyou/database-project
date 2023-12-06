type Props = {
  name: string;
};

const Avatar = ({ name }: Props) => {
  return (
    <div className="flex items-center">
      <div className="text-lg">{name}</div>
    </div>
  );
};

export default Avatar;
