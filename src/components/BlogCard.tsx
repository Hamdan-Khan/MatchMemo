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
      <div className="bg-slate-700 p-3 md:p-4 rounded-lg hover:bg-slate-600 transition-colors">
        <h2 className="font-semibold text-white text-base md:text-lg line-clamp-2">
          {title}
        </h2>
        <p className="text-xs md:text-sm text-gray-300 mt-1 line-clamp-2">
          {content}
        </p>
      </div>
    </Link>
  );
}
