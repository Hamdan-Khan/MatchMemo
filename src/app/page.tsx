import Status from "@/components/Status";
import Sidebar from "@/components/Sidebar";
import BlogBar from "@/components/BlogBar";
import { baseURL } from "@/lib/footballApi";
import Link from "next/link";
import { categorizeMatches } from "@/utils/footballApi";
import { DateDisplay } from "@/components/DateDisplay";

export const revalidate = 10;

export default async function Home() {
  const res = await fetch(`${baseURL}/api/matches/`, { method: "GET" });

  if (!res.ok) {
    return (
      <>
        <Link href="/league/cl">Leagues</Link>
        <Link href="/blog/4">Blogs</Link>
      </>
    );
  }

  const data = await res.json();
  const { matches }: { matches: [] } = data;

  const { earlierMatches, todayMatches, upcomingMatches } =
    categorizeMatches(matches);

  return (
    <>
      <Sidebar />
      <section className="flex-grow px-2 md:px-4 md:w-[600px]">
        <div className="flex justify-between items-center mb-4 md:mb-2">
          <h1 className="text-md md:text-xl font-bold">MATCHES</h1>
          <DateDisplay />
        </div>
        <Status
          matchesListToday={todayMatches}
          matchesListTomorrow={upcomingMatches}
          matchesListYesterday={earlierMatches}
        />
      </section>
      <BlogBar />
    </>
  );
}
