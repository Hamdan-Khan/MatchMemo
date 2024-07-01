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
    return <div>Error fetching data</div>;
  }
  const leagues = await res.json();
  return (
    <section className="px-2 md:px-4 py-2 bg-[rgb(45,51,63)] rounded-md h-max pb-5">
      <div>
        <h1 className="font-bold text-xl mb-4 text-textHeading text-center">
          Leagues
        </h1>
        <ul className="space-y-2">
          {leagues.map((league: LeagueProps) => (
            <div key={league?.id} className="flex">
              <LinkSide
                href={league.code}
                name={league?.name}
                src={league?.emblem}
              />
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
