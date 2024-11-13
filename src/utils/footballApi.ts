/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const filterLeague = async (filterData: string, allMatches: any) => {
  const matches: matchesType[] = allMatches?.matches;
  const filteredLeagues = matches.filter(
    (item) => item.competition.name === filterData
  );
  return filteredLeagues;
};

export const categorizeMatches = (matches: any) => {
  const today = new Date();
  const tomorrowDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const todayMatches = [];
  const earlierMatches = [];
  const upcomingMatches = [];

  for (const match of matches) {
    const matchDate = new Date(match.utcDate);

    if (matchDate >= today && matchDate < sevenDaysFromNow) {
      if (matchDate >= today && matchDate < tomorrowDate) {
        todayMatches.push(match);
      } else {
        upcomingMatches.push(match);
      }
    } else if (matchDate >= sevenDaysAgo && matchDate < today) {
      earlierMatches.push(match);
    }
  }

  return {
    todayMatches,
    earlierMatches,
    upcomingMatches,
  };
};
