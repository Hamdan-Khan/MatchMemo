import { filterLeague } from "@/utils/footballApi";

export async function GET() {
  try {
    const data = await filterLeague("Campeonato Brasileiro Série A");

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Server error", status: 500 });
  }
}
