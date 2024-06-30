import { baseURL } from "@/lib/footballApi";
import { Blog } from "@prisma/client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Page = async ({ params }: { params: { slug: string } }) => {
  const res = await fetch(`${baseURL}/api/blog?id=${params.slug}`, {
    method: "get",
  });
  const blogData: Blog = await res.json();
  const unformattedDate = new Date(blogData.blogDate);
  const formattedDate = unformattedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <section className="w-auto">
      <div className="bg-slate-900 p-6 rounded-xl max-w-[700px] m-auto">
        <h1 className="text-3xl font-bold ">{blogData.blogTitle}</h1>
        <div className="h-[1px] bg-slate-600 my-2"></div>
        <h3 className="text-sm text-slate-400">{formattedDate}</h3>
        <p className="mt-4 whitespace-pre-wrap">{blogData.blogDescription}</p>
      </div>
    </section>
  );
};

export default Page;
