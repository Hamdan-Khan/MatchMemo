import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const request = await req.json();
    const { id } = request;
    const result = await prisma.blog.delete({
      where: {
        blogId: id,
      },
    });

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Server error", status: 500 });
  }
}
