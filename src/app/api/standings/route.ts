import { options } from "@/lib/footballApi";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const league = url.searchParams.get("league");

    if (league) {
      const res = await fetch(
        `http://api.football-data.org/v4/competitions/${league}/standings`,
        options
      );

      const response = await res.json();

      const result = { status: 200, matches: response.standings };

      return Response.json(result);
    }
  } catch (error) {
    return Response.json({ error: "Error in server", status: 500 });
  }
}
