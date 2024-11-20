import { options } from "@/lib/footballApi";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const team = url.searchParams.get("team");

    if (team) {
      const res = await fetch(
        `http://api.football-data.org/v4/teams/${team}`,
        options
      );

      const response = await res.json();

      const result = { status: 200, team: response };

      return Response.json(result);
    }
  } catch (error) {
    return Response.json({ error: "Error in server", status: 500 });
  }
}
