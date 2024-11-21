import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const request = await req.json();
    const { playerId, playerRating, teamId } = request;
    const result = await prisma.playerRating.create({
      data: {
        playerId,
        playerRating,
        teamId,
      },
    });

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Server error", status: 500 });
  }
}
