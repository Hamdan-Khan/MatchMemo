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
    return <div>An error occured :( Please visit the page later</div>;
  }

  const { matches } = data;
  const { earlierMatches, todayMatches, upcomingMatches } =
    categorizeMatches(matches);

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
        matchesListTomorrow={upcomingMatches}
        matchesListYesterday={earlierMatches}
      />
    </section>
  );
};

export default Page;
