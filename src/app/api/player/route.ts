import { options } from "@/lib/footballApi";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const player = url.searchParams.get("player");

    if (player) {
      const res = await fetch(
        `http://api.football-data.org/v4/persons/${player}`,
        options
      );

      const response = await res.json();

      const result = { status: 200, player: response };

      return Response.json(result);
    }
  } catch (error) {
    return Response.json({ error: "Error in server", status: 500 });
  }
}
