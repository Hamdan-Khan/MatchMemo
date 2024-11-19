import { baseURL } from "@/lib/footballApi";
import { Blog } from "@prisma/client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Page = async ({ params }: { params: { slug: string } }) => {
  const res = await fetch(`${baseURL}/api/blog?id=${params.slug}`, {
    method: "get",
  });
  if (!res.ok) {
    return (
      <section className="w-full p-4">
        <div className="bg-slate-900 p-4 md:p-6 rounded-xl max-w-[700px] mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Blog not found</h1>
        </div>
      </section>
    );
  }
  const blogData: Blog = await res.json();
  const unformattedDate = new Date(blogData.blogDate);
  const formattedDate = unformattedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <section className="w-full p-4">
      <div className="bg-slate-900 p-4 md:p-6 rounded-xl max-w-[700px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold break-words">
          {blogData.blogTitle}
        </h1>
        <div className="h-[1px] bg-slate-600 my-2 md:my-3"></div>
        <h3 className="text-xs md:text-sm text-slate-400">{formattedDate}</h3>
        <p className="mt-4 whitespace-pre-wrap text-sm md:text-base">
          {blogData.blogDescription}
        </p>
      </div>
    </section>
  );
};

export default Page;
