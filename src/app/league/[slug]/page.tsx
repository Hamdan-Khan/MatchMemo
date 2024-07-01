import Status from "@/components/Status";
import { baseURL } from "@/lib/footballApi";

type match = { competition: { code: string } };

const Page = async ({ params }: { params: { slug: string } }) => {
  const res = await fetch(`${baseURL}/api/leagues/matches/`, { method: "GET" });

  if (!res.ok) {
    return <div>An error occured :( Please visit the page later</div>;
  }

  const { todayMatchesData, tomorrowMatchesData, yesterdayMatchesData } =
    await res.json();

  const todayMatches: [] = todayMatchesData?.matches.filter((m: match) => {
    return m.competition.code == params.slug;
  });
  const tomorrowMatches: [] = tomorrowMatchesData?.matches.filter(
    (m: match) => {
      return m.competition.code == params.slug;
    }
  );
  const yesterdayMatches: [] = yesterdayMatchesData?.matches.filter(
    (m: match) => {
      return m.competition.code == params.slug;
    }
  );

  const nd = new Date();
  const dateConvert = nd.toDateString();
  return (
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
  );
};

export default Page;
