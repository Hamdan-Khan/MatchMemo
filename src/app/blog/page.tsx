import { baseURL } from "@/lib/footballApi";
import { type Blog } from "@prisma/client";
import Link from "next/link";

export default async function Blog() {
  const res = await fetch(`${baseURL}/api/blog`, {
    method: "GET",
  });
  const blogs: Blog[] = await res.json();
  const sorted = blogs.sort(
    (a, b) => new Date(b.blogDate).getTime() - new Date(a.blogDate).getTime()
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-white">All Blogs</h1>
      <div className="flex flex-col gap-3">
        {sorted.map((blog) => (
          <Link href={`/blog/${blog.blogId}`} key={blog.blogId}>
            <div
              key={blog.blogId}
              className="bg-secondary border border-zinc-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-medium text-zinc-200 hover:text-zinc-400">
                {blog.blogTitle}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(blog.blogDate).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
