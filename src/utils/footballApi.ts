import { options, tomorrow, yesterday } from "@/lib/footballApi";
import { matchesType } from "@/types";

export const getTodayMatches = async () => {
  const matchData = await fetch(
    "https://api.football-data.org/v4/matches",
    options
  );
  return matchData.json();
};

export const getYesterdayMatches = async () => {
  const matchData = await fetch(
    `https://api.football-data.org/v4/matches?date=${yesterday}`,
    options
  );
  return matchData.json();
};

export const getTomorrowMatches = async () => {
  const matchData = await fetch(
    `https://api.football-data.org/v4/matches?date=${tomorrow}`,
    options
  );
  return matchData.json();
};

export const filterLeague = async (filterData: string) => {
  const allMatches = await getTodayMatches();
  const matches: matchesType[] = allMatches?.matches;
  const filteredLeagues = matches.filter(
    (item) => item.competition.name === filterData
  );
  return filteredLeagues;
};
