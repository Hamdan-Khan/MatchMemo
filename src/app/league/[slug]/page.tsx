import Status from "@/components/Status";
import { baseURL } from "@/lib/footballApi";
import { categorizeMatches } from "@/utils/footballApi";

export const revalidate = 10;

const Page = async ({ params }: { params: { slug: string } }) => {
  const res = await fetch(`${baseURL}/api/leagues?league=${params.slug}`, {
    method: "GET",
    next: { revalidate: 10 },
  });

  const data = await res.json();

  if (data.status != 200) {
    return (
      <div className="w-full flex items-center justify-center p-4 text-center">
        <p className="text-lg text-gray-400">
          An error occurred :( Please visit the page later
        </p>
      </div>
    );
  }

  const { matches } = data;
  const { earlierMatches, todayMatches, upcomingMatches } =
    categorizeMatches(matches);

  const nd = new Date();
  const dateConvert = nd.toDateString();
  return (
    <section className="flex-grow w-full md:max-w-[600px] p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold">MATCHES</h1>
        <div className="px-3 md:px-4 py-1 bg-slate-600 rounded-md text-textPrimary text-sm">
          <p>{dateConvert}</p>
        </div>
      </div>
      <Status
        matchesListToday={todayMatches}
        matchesListTomorrow={upcomingMatches}
        matchesListYesterday={earlierMatches}
      />
    </section>
  );
};

export default Page;
