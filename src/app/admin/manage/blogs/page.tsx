"use client";

import { baseURL } from "@/lib/footballApi";
import { Blog } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}/api/blog`, {
          method: "GET",
        });
        const data: Blog[] = await res.json();
        const sortedData = data.sort(
          (a, b) =>
            new Date(b.blogDate).getTime() - new Date(a.blogDate).getTime()
        );
        setBlogs(sortedData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const deleteBlog = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blog/delete`, {
        method: "POST",
        body: JSON.stringify({ id: id }),
      });
      if (response.ok) {
        alert("Blog deleted!");
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.blogId !== id));
      } else {
        alert("Error deleting post, please try again.");
      }
    } catch (error) {
      alert("Error deleting post, please try again");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={`${loading ? "cursor-progress" : ""}`}>
      <div className="flex flex-col gap-4 bg-slate-900 p-6 rounded-lg max-w-[800px]">
        <h1 className="font-semibold text-3xl text-white">Manage Blogs</h1>

        <div className="flex flex-col gap-3">
          {blogs.map((blog) => (
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
              <button
                className="bg-red-600 px-5 font-semibold py-2 rounded-md max-w-max ml-auto"
                onClick={() => deleteBlog(blog.blogId)}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
