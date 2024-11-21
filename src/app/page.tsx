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
      <div className="flex flex-col gap-4 items-center justify-center min-h-[50vh]">
        <p className="text-lg text-gray-400">Unable to load matches</p>
        <div className="flex gap-4">
          <Link href="/league/cl" className="text-blue-400 hover:underline">
            Leagues
          </Link>
          <Link href="/blog/4" className="text-blue-400 hover:underline">
            Blogs
          </Link>
        </div>
      </div>
    );
  }

  const data = await res.json();
  const liveMatches = data.matches.filter((match: any) => match.status === 'IN_PLAY');
  const { matches }: { matches: [] } = data;

  const { earlierMatches, todayMatches, upcomingMatches} =
    categorizeMatches(matches);

  return (
    <>
      <div className="w-full md:w-auto order-2 md:order-1">
        <Sidebar />
      </div>
      <section className="flex-grow order-1 md:order-2 w-full md:max-w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl md:text-2xl font-bold">MATCHES</h1>
          <DateDisplay />
        </div>
        <Status
          matchesListToday={todayMatches}
          matchesListTomorrow={upcomingMatches}
          matchesListYesterday={earlierMatches}
          matchesListLive={liveMatches}
        />
      </section>
      <div className="w-full md:w-auto order-3">
        <BlogBar />
      </div>
    </>
  );
}
