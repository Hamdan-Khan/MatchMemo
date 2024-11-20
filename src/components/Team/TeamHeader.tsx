import Image from "next/image";
import Link from "next/link";
import { Team } from "@/types";

export default function TeamHeader({ team }: { team: Team }) {
  return (
    <div className="bg-secondary rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-32 h-32">
          <Image
            src={team.crest}
            alt={team.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-white mb-2">{team.name}</h1>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-300">
            <p>Founded: {team.founded}</p>
            <p>Colors: {team.clubColors}</p>
            <p>Venue: {team.venue}</p>
          </div>
          {team.website && (
            <Link
              href={team.website}
              target="_blank"
              className="text-blue-400 hover:text-blue-300 mt-2 inline-block"
            >
              Official Website
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
