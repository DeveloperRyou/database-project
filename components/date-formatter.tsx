import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className="text-gray-500">
      {format(date, "LLLL	d, yyyy")}
    </time>
  );
};

const DateFormatterForDB = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return format(date, "yyyy-MM-dd HH:mm:ss");
};

export default DateFormatter;
export { DateFormatterForDB };
