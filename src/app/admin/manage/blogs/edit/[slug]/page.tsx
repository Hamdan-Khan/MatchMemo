import EditBlogForm from "@/components/EditBlogForm";
import { baseURL } from "@/lib/footballApi";

export default async function Page({ params }: { params: { slug: string } }) {
  const blogId = parseInt(params.slug);

  const response = await fetch(`${baseURL}/api/blog?id=${blogId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }

  const blog = await response.json();

  return <EditBlogForm blog={blog} />;
}
