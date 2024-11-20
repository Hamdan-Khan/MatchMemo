import { baseURL } from "@/lib/footballApi";
import { PlayerResponse } from "@/types/player";
import PlayerHeader from "@/components/Player/PlayerHeader";
import CurrentTeamSection from "@/components/Player/CurrentTeamSection";
import CompetitionsSection from "@/components/Player/CompetitionSection";

async function PlayerPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${baseURL}/api/player?player=${params.slug}`, {
    method: "GET",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg text-gray-400">Unable to load player data</p>
      </div>
    );
  }

  const data = (await res.json()) as PlayerResponse;
  const player = data.player;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PlayerHeader player={player} />
      <CurrentTeamSection team={player.currentTeam} />
      {player.currentTeam.runningCompetitions?.length > 0 && (
        <CompetitionsSection
          competitions={player.currentTeam.runningCompetitions}
        />
      )}
    </div>
  );
}

export default PlayerPage;
