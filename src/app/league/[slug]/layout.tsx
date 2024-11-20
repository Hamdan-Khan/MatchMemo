import BlogBar from "@/components/BlogBar";
import Sidebar from "@/components/Sidebar";
import Standings from "@/components/Standings";
import { baseURL } from "@/lib/footballApi";

export default async function LeagueLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  let standings = null;
  try {
    const res = await fetch(`${baseURL}/api/standings?league=${params.slug}`, {
      method: "GET",
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.status === 200) {
        standings = data.matches;
      }
    }
  } catch (error) {
    console.error("Error fetching standings:", error);
  }

  return (
    <>
      <Sidebar />
      {children}
      {standings ? <Standings standings={standings} /> : <BlogBar />}
    </>
  );
}
