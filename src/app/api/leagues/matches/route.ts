import {
  getTodayMatches,
  getTomorrowMatches,
  getYesterdayMatches,
} from "@/utils/footballApi";

export async function GET() {
  try {
    const todayMatchesData = await getTodayMatches();
    const tomorrowMatchesData = await getTomorrowMatches();
    const yesterdayMatchesData = await getYesterdayMatches();

    const result = {
      todayMatchesData,
      tomorrowMatchesData,
      yesterdayMatchesData,
    };
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Server error", status: 500 });
  }
}
