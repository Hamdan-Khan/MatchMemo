import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paramId = searchParams.get("id");

    if (paramId) {
      const id = parseInt(paramId);
      const result = await prisma.blog.findFirst({
        where: {
          blogId: id,
        },
      });
      return Response.json(result);
    } else {
      const result = await prisma.blog.findMany();
      return Response.json(result);
    }
  } catch (error) {
    return Response.json({ error: "Server error", status: 500 });
  }
}
