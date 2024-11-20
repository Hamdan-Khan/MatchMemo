import { baseURL } from "@/lib/footballApi";
import { TeamResponse } from "@/types";
import TeamHeader from "@/components/Team/TeamHeader";
import CoachSection from "@/components/Team/CoachSection";
import CompetitionsSection from "@/components/Team/CompetitionsSection";
import SquadSection from "@/components/Team/SquadSection";

async function TeamPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${baseURL}/api/team?team=${params.slug}`, {
    method: "GET",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg text-gray-400">Unable to load team data</p>
      </div>
    );
  }

  const data = (await res.json()) as TeamResponse;
  const team = data.team;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <TeamHeader team={team} />
      {team.coach && <CoachSection coach={team.coach} />}
      {team.runningCompetitions?.length > 0 && (
        <CompetitionsSection competitions={team.runningCompetitions} />
      )}
      {team.squad?.length > 0 && <SquadSection squad={team.squad} />}
    </div>
  );
}

export default TeamPage;
