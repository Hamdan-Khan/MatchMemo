import {
  getTodayMatches,
  getTomorrowMatches,
  getYesterdayMatches,
} from "@/utils/footballApi";
import Status from "@/components/Status";
import Sidebar from "@/components/Sidebar";
import BlogBar from "@/components/BlogBar";

export default async function Home() {
  const todayMatchesData = await getTodayMatches();
  const tomorrowMatchesData = await getTomorrowMatches();
  const yesterdayMatchesData = await getYesterdayMatches();

  const todayMatches = todayMatchesData?.matches;
  const tomorrowMatches = tomorrowMatchesData?.matches;
  const yesterdayMatches = yesterdayMatchesData?.matches;

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
