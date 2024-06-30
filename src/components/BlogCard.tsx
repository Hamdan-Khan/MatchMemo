import Link from "next/link";

export default function BlogCard({
  title,
  content,
  id,
}: {
  title: string;
  content: string;
  id: number;
}) {
  return (
    <Link href={`/blog/${id}`}>
      <div className="bg-slate-700 p-4 rounded-lg">
        <h2 className="font-semibold text-white text-lg">{title}</h2>
        <p className="text-sm text-ellipsis">{content}</p>
      </div>
    </Link>
  );
}
