import { matchesType } from "@/types";

export const filterLeague = async (
  filterData: string,
  allMatches: { matches: matchesType[] }
) => {
  const matches: matchesType[] = allMatches?.matches || [];
  const filteredLeagues = matches.filter(
    (item) => item.competition.name === filterData
  );
  return filteredLeagues;
};

export const categorizeMatches = (matches: matchesType) => {
  // Check if matches is an array and not empty
  if (!Array.isArray(matches) || matches.length === 0) {
    console.error("Invalid or empty matches data");
    return {
      todayMatches: [],
      earlierMatches: [],
      upcomingMatches: [],
    };
  }

  const today = new Date();
  const tomorrowDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const todayMatches: matchesType[] = [];
  const earlierMatches: matchesType[] = [];
  const upcomingMatches: matchesType[] = [];

  matches.forEach((match: matchesType) => {
    if (match && match.utcDate) {
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
  });

  return {
    todayMatches,
    earlierMatches,
    upcomingMatches,
  };
};
