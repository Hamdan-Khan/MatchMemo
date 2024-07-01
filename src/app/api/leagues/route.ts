import { options } from "@/lib/footballApi";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const league = searchParams.get("league");

    if (league) {
      const res = await fetch(
        `http://api.football-data.org/v4/competitions/${league}/matches`,
        options
      );
      const result = await res.json();
      return Response.json(result.competitions);
    } else {
      const res = await fetch(
        "http://api.football-data.org/v4/competitions/",
        options
      );
      const result = await res.json();

      const sortedCompetitions = result.competitions.sort(
        (
          a: { lastUpdated: string | number | Date },
          b: { lastUpdated: string | number | Date }
        ) => {
          return (
            new Date(b.lastUpdated).valueOf() -
            new Date(a.lastUpdated).valueOf()
          );
        }
      );
      return Response.json(sortedCompetitions);
    }
  } catch (error) {
    return Response.json({ error: "Server error", status: 500 });
  }
}
