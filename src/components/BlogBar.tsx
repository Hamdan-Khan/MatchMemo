import BlogCard from "./BlogCard";
import { baseURL } from "@/lib/footballApi";
import { Blog } from "@prisma/client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function BlogBar() {
  const res = await fetch(`${baseURL}/api/blog`, { method: "get" });

  const blogs: Blog[] = await res.json();
  return (
    <aside className="flex flex-col bg-[rgb(40,46,58)] px-2 md:px-4 py-2 rounded-md w-[300px] h-max pb-6">
      <div>
        <h1 className="font-bold text-xl mb-4 text-slate-400 text-center">
          Blogs
        </h1>
        <ul className="flex flex-col gap-3">
          {blogs.map((blog) => {
            const { blogTitle, blogDescription, blogId } = blog;
            const reducedContent =
              blogDescription.length <= 65
                ? blogDescription
                : blogDescription.slice(0, 65) + "...";
            return (
              <BlogCard
                key={blogId}
                id={blogId}
                title={blogTitle}
                content={reducedContent}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
