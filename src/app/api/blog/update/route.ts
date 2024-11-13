import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const request = await req.json();
    const { id, title, content } = request;
    const result = await prisma.blog.update({
      where: { blogId: id },
      data: {
        blogTitle: title,
        blogDescription: content,
      },
    });

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Server error", status: 500 });
  }
}
