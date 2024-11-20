import { baseURL } from "@/lib/footballApi";
import { Blog } from "@prisma/client";
import Link from "next/link";
import { revalidatePath } from "next/cache";

async function deleteBlog(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));
  try {
    const response = await fetch(`${baseURL}/api/blog/delete`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete blog");
    }

    revalidatePath("/admin/manage/blogs");
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
}

export default async function Blogs() {
  const res = await fetch(`${baseURL}/api/blog`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Failed to fetch blogs</div>;
  }

  const data: Blog[] = await res.json();
  const blogs = data.sort(
    (a, b) => new Date(b.blogDate).getTime() - new Date(a.blogDate).getTime()
  );

  return (
    <div>
      <div className="flex flex-col gap-4 bg-outer border border-zinc-700 p-6 rounded-lg max-w-[800px]">
        <h1 className="font-semibold text-3xl text-white">Manage Blogs</h1>

        <div className="flex flex-col gap-3">
          {blogs.map((blog) => (
            <div
              key={blog.blogId}
              className="bg-inner border border-zinc-600 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={`/blog/${blog.blogId}`}>
                <h2 className="text-lg font-medium text-zinc-200 hover:text-zinc-400">
                  {blog.blogTitle}
                </h2>
              </Link>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(blog.blogDate).toLocaleDateString()}
              </p>
              <div className="my-3 flex gap-4">
                <form action={deleteBlog}>
                  <input type="hidden" name="id" value={blog.blogId} />
                  <button
                    type="submit"
                    className="bg-red-600 px-5 font-semibold py-2 rounded-md max-w-max ml-auto"
                  >
                    Delete
                  </button>
                </form>
                <Link href={`/admin/manage/blogs/edit/${blog.blogId}`}>
                  <button className="bg-yellow-600 px-5 font-semibold py-2 rounded-md max-w-max ml-auto">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
