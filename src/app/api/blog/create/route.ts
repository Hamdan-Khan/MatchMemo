import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const currentDate = new Date();
    const request = await req.json();
    const { title, content } = request;
    const result = await prisma.blog.create({
      data: {
        blogDate: currentDate,
        blogTitle: title,
        blogDescription: content,
        adminId: 1,
      },
    });

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Server error", status: 500 });
  }
}
