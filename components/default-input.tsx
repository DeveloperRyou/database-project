export default function DefaultInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      className={`w-full h-full px-4 py-2 border border-gray-600 ${
        props.disabled ? "bg-gray-200" : ""
      }`}
      {...props}
    />
  );
}
