import { FC, Key } from "react";
import LinkSide from "./LinkSide";
import { baseURL } from "@/lib/footballApi";

type LeagueProps = {
  id: Key | null | undefined;
  href: string;
  name: string;
  emblem: string;
  code: string;
};

const Sidebar: FC = async () => {
  const res = await fetch(`${baseURL}/api/leagues`, { method: "get" });
  if (!res.ok) {
    return <div className="text-gray-400">Error fetching data</div>;
  }
  const leagues = await res.json();
  return (
    <section className="bg-[rgb(45,51,63)] rounded-md h-max p-4">
      <div>
        <h1 className="font-bold text-xl mb-4 text-textHeading text-center">
          Leagues
        </h1>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-0">
          {leagues.map((league: LeagueProps) => (
            <div key={league?.id}>
              <LinkSide
                href={league.code}
                name={league?.name}
                src={league?.emblem}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
