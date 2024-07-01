import { options, tomorrow, yesterday } from "@/lib/footballApi";
import { matchesType } from "@/types";

export const getTodayMatches = async () => {
  const res = await fetch("https://api.football-data.org/v4/matches", options);
  if (!res.ok) {
    return;
  }
  return res.json();
};

export const getYesterdayMatches = async () => {
  const res = await fetch(
    `https://api.football-data.org/v4/matches?date=${yesterday}`,
    options
  );
  if (!res.ok) {
    return;
  }
  return res.json();
};

export const getTomorrowMatches = async () => {
  const res = await fetch(
    `https://api.football-data.org/v4/matches?date=${tomorrow}`,
    options
  );
  if (!res.ok) {
    return;
  }
  return res.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterLeague = async (filterData: string, allMatches: any) => {
  const matches: matchesType[] = allMatches?.matches;
  const filteredLeagues = matches.filter(
    (item) => item.competition.name === filterData
  );
  return filteredLeagues;
};
