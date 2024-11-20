import { options } from "@/lib/footballApi";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const league = url.searchParams.get("league");
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const fromDate = `${sevenDaysAgo.getFullYear()}-${String(
      sevenDaysAgo.getMonth() + 1
    ).padStart(2, "0")}-${String(sevenDaysAgo.getDate()).padStart(2, "0")}`;
    const sevenDaysFromNow = new Date(
      today.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    const toDate = `${sevenDaysFromNow.getFullYear()}-${String(
      sevenDaysFromNow.getMonth() + 1
    ).padStart(2, "0")}-${String(sevenDaysFromNow.getDate()).padStart(2, "0")}`;

    if (league) {
      const res = await fetch(
        `http://api.football-data.org/v4/competitions/${league}/matches?dateFrom=${fromDate}&dateTo=${toDate}`,
        options
      );

      const response = await res.json();

      const result = {
        status: 200,
        matches: response.matches,
        competition: response.competition,
      };

      return Response.json(result);
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
    return Response.json({ error: "Error in server", status: 500 });
  }
}
