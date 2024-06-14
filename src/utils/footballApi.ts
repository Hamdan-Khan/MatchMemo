import { options, yesterday } from "@/lib/footballApi";
import { matchesType } from "@/types";

export const getMatchesfootball = async () => {
  const matchData = await fetch(
    "https://api.football-data.org/v4/matches",
    options
  );
  return matchData.json();
};

export const getMatchesfootballFinished = async () => {
  const matchData = await fetch(
    `https://api.football-data.org/v4/matches?date=${yesterday}`,
    options
  );
  return matchData.json();
};

export const filterLeague = async (filterData: string) => {
  const allMatches = await getMatchesfootball();
  const matches: matchesType[] = allMatches?.matches;
  const filteredLeagues = matches.filter(
    (item) => item.competition.name === filterData
  );
  return filteredLeagues;
};
