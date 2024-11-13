import { options } from "@/lib/footballApi";

export async function GET() {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000);

    const fromDate = `${sevenDaysAgo.getFullYear()}-${String(
      sevenDaysAgo.getMonth() + 1
    ).padStart(2, "0")}-${String(sevenDaysAgo.getDate()).padStart(2, "0")}`;
    const sevenDaysFromNow = new Date(
      today.getTime() + 4 * 24 * 60 * 60 * 1000
    );

    const toDate = `${sevenDaysFromNow.getFullYear()}-${String(
      sevenDaysFromNow.getMonth() + 1
    ).padStart(2, "0")}-${String(sevenDaysFromNow.getDate()).padStart(2, "0")}`;

    // {
    //   message: 'Specified period must not exceed 10 days.',
    //   errorCode: 400
    // }
    // hence +-4 days interval
    const res = await fetch(
      `http://api.football-data.org/v4/matches?dateFrom=${fromDate}&dateTo=${toDate}`,
      options
    );

    const response = await res.json();

    const result = { status: 200, matches: response.matches };

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Server error", status: 500 });
  }
}
