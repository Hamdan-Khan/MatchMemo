// import { filterLeague } from "@/utils/footballApi";

export async function GET() {
  try {
    const data = { code: 1234 };

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Server error", status: 500 });
  }
}
