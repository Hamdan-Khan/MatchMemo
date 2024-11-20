import Image from "next/image";
import { StandingsType } from "@/types";

export default function Standings({
  standings,
}: {
  standings: StandingsType[];
}) {
  const leagueTable = standings[0]?.table || [];

  return (
    <aside className="flex flex-col bg-[rgb(40,46,58)] p-4 rounded-md w-full md:w-[350px] h-max">
      <h1 className="font-bold text-xl mb-4 text-slate-400 text-center">
        League Table
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="pb-2 text-left">Pos</th>
              <th className="pb-2 text-left">Team</th>
              <th className="pb-2 text-center">P</th>
              <th className="pb-2 text-center">GD</th>
              <th className="pb-2 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {leagueTable.map((team) => (
              <tr
                key={team.team.id}
                className="border-b border-gray-700 last:border-0 hover:bg-[rgb(45,51,63)] transition-colors"
              >
                <td className="py-2 text-left">{team.position}</td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <div className="relative w-4 h-4">
                      <Image
                        src={team.team.crest}
                        alt={team.team.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="truncate" title={team.team.name}>
                      {team.team.shortName}
                    </span>
                  </div>
                </td>
                <td className="py-2 text-center">{team.playedGames}</td>
                <td className="py-2 text-center">{team.goalDifference}</td>
                <td className="py-2 text-center font-semibold">
                  {team.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </aside>
  );
}
