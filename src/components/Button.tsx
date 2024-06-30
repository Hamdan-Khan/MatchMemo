export default function Button({
  children,
  color,
}: {
  children: string;
  color: string;
}) {
  return (
    <button
      className={`${
        color == "red" ? "bg-red-600" : "bg-green-600"
      } px-5 font-semibold py-2 rounded-md mt-5`}
    >
      {children}
    </button>
  );
}
