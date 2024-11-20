import Image from "next/image";
import Link from "next/link";
import { CurrentTeam } from "@/types/player";

export default function CurrentTeamSection({ team }: { team: CurrentTeam }) {
  return (
    <div className="bg-secondary rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">Current Team</h2>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16">
          <Image
            src={team.crest}
            alt={team.name}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <Link
            href={`/team/${team.id}`}
            className="text-xl font-medium text-white hover:text-blue-400 transition-colors"
          >
            {team.name}
          </Link>
          <p className="text-sm text-gray-300">
            Contract: {team.contract.start} - {team.contract.until}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
        <p>Founded: {team.founded}</p>
        <p>Colors: {team.clubColors}</p>
        <p>Venue: {team.venue}</p>
        <p>Location: {team.area.name}</p>
      </div>
    </div>
  );
}
