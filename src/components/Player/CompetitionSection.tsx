import Image from "next/image";
import { Competition } from "@/types";
import Link from "next/link";

export default function CompetitionsSection({
  competitions,
}: {
  competitions: Competition[];
}) {
  return (
    <div className="bg-secondary rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Current Competitions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competitions.map((competition) => (
          <div
            key={competition.id}
            className="flex items-center gap-3 bg-primary p-4 rounded-lg"
          >
            <div className="relative w-8 h-8">
              <Image
                src={competition.emblem}
                alt={competition.name}
                fill
                className="object-contain"
              />
            </div>
            <Link href={`/league/${competition.code}`}>
              <div>
                <p className="font-medium text-white">{competition.name}</p>
                <p className="text-sm text-gray-400">{competition.type}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
