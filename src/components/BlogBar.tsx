import BlogCard from "./BlogCard";
import { baseURL } from "@/lib/footballApi";
import { Blog } from "@prisma/client";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function BlogBar() {
  const res = await fetch(`${baseURL}/api/blog`, { method: "get" });
  if (!res.ok) {
    return <div className="text-gray-400">Error fetching data</div>;
  }

  const blogs: Blog[] = await res.json();
  const sorted = blogs
    .sort(
      (a, b) => new Date(b.blogDate).getTime() - new Date(a.blogDate).getTime()
    )
    .slice(0, 5);
  return (
    <aside className="flex flex-col bg-[rgb(40,46,58)] p-4 rounded-md w-full md:w-[300px] h-max">
      <div>
        <h1 className="font-bold text-xl mb-4 text-slate-400 text-center">
          Blogs
        </h1>
        <div className="flex flex-col gap-3">
          {sorted.map((blog) => {
            const { blogTitle, blogId } = blog;
            const reducedContent = "Click to view blog content";
            return (
              <BlogCard
                key={blogId}
                id={blogId}
                title={blogTitle}
                content={reducedContent}
              />
            );
          })}
        </div>
        {blogs.length > 5 ? (
          <p className="mt-4 text-center">
            <Link href="/blog" className="text-blue-400 hover:underline">
              View all...
            </Link>
          </p>
        ) : null}
      </div>
    </aside>
  );
}
