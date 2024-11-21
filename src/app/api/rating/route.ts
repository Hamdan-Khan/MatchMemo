import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const request = await req.json();
    const { playerId } = request;
    const result = await prisma.playerRating.findFirst({
      where: { playerId },
    });

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Server error", status: 500 });
  }
}
