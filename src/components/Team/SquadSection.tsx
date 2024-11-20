import { Player } from "@/types";
import Link from "next/link";

export default function SquadSection({ squad }: { squad: Player[] }) {
  return (
    <div className="bg-secondary rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">Squad</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Position</th>
              <th className="p-2">Nationality</th>
              <th className="p-2">Age</th>
              <th className="p-2">Contract Until</th>
            </tr>
          </thead>
          <tbody>
            {squad
              .sort((a, b) => (a.shirtNumber || 99) - (b.shirtNumber || 99))
              .map((player, i) => {
                const age =
                  new Date().getFullYear() -
                  new Date(player.dateOfBirth).getFullYear();
                return (
                  <tr
                    key={player.id}
                    className="border-b border-gray-700 hover:bg-primary/50 transition-colors"
                  >
                    <td className="p-2 text-gray-300">{i + 1}</td>
                    <td className="p-2 text-white font-medium">
                      <Link href={`/player/${player.id}`}>{player.name}</Link>
                    </td>
                    <td className="p-2 text-gray-300">{player.position}</td>
                    <td className="p-2 text-gray-300">{player.nationality}</td>
                    <td className="p-2 text-gray-300">{age}</td>
                    <td className="p-2 text-gray-300">
                      {player.contract?.until || "-"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
