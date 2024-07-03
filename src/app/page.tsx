import Status from "@/components/Status";
import Sidebar from "@/components/Sidebar";
import BlogBar from "@/components/BlogBar";
import { baseURL } from "@/lib/footballApi";
import Link from 'next/link'

export default async function Home() {
  const res = await fetch(`${baseURL}/api/leagues/matches/`, { method: "GET" });

  if (!res.ok) {
    return (
      <>
        <Link href="/league/cl">Leagues</Link>;
        <Link href="/blog/4">Blogs</Link>;
      </>)
  }

  const { todayMatchesData, tomorrowMatchesData, yesterdayMatchesData } =
    await res.json();

  const todayMatches: [] = todayMatchesData?.matches;
  const tomorrowMatches: [] = tomorrowMatchesData?.matches;
  const yesterdayMatches: [] = yesterdayMatchesData?.matches;
  const nd = new Date();
  const dateConvert = nd.toDateString();

  return (
    <>
      <Sidebar />
      <section className="flex-grow px-2 md:px-4 md:w-[600px]">
        <div className="flex justify-between items-center mb-4 md:mb-2">
          <h1 className="text-md md:text-xl font-bold">MATCHES</h1>
          <div className="px-4 py-0 md:py-1 bg-slate-600 rounded-md text-textPrimary text-sm">
            <p>{`${dateConvert}`}</p>
          </div>
        </div>
        <Status
          matchesListToday={todayMatches}
          matchesListTomorrow={tomorrowMatches}
          matchesListYesterday={yesterdayMatches}
        />
      </section>
      <BlogBar />
    </>
  );
}
