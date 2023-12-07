import Icon from "@/components/icon";

interface Props {
  onClickEdit: () => void;
  onClickDelete: () => void;
  onClickView: () => void;
}

export default function CommentBodyControl({
  onClickEdit,
  onClickDelete,
  onClickView,
}: Props) {
  return (
    <div className="flex gap-2">
      <Icon
        name="edit"
        sz={18}
        onClick={onClickEdit}
        className="cursor-pointer"
      />
      <Icon
        name="delete"
        sz={18}
        onClick={onClickDelete}
        className="cursor-pointer"
      />
      <Icon
        name="down-arrow"
        sz={24}
        onClick={onClickView}
        className="arrow cursor-pointer"
      />
    </div>
  );
}
