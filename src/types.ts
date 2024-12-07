export type apiOptions = {
  next: { revalidate: number };
  headers: {
    "X-Auth-Token": string;
    "Content-Type": string;
  };
};

export type matchesArea = {
  id?: number;
  name: string;
};
export type matchesCompetition = {
  id?: number;
  name: string;
  emblem: string;
};
export type matchesHomeTeam = {
  id?: number;
  name: string;
  crest: string;
};
export type matchesAwayTeam = {
  id?: number;
  name: string;
  crest: string;
};
export type scores = {
  fullTime: {
    home: number;
    away: number;
  };
  halfTime?: {
    home: number;
    away: number;
  };
};

export type matchesType = {
  area: matchesArea;
  competition: matchesCompetition;
  id: number;
  utcDate: string;
  status: string;
  matchday?: number;
  homeTeam?: matchesHomeTeam;
  awayTeam?: matchesAwayTeam;
  score?: scores;
};

export type newsType = {
  title: string;
  url: string;
  urlToImage: string;
};

export type TeamStanding = {
  position: number;
  team: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  playedGames: number;
  form: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
};

export type StandingsType = {
  stage: string;
  type: string;
  group: string | null;
  table: TeamStanding[];
};

export interface TeamResponse {
  status: number;
  team: Team;
}

export interface Team {
  area: Area;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  runningCompetitions: Competition[];
  coach: Coach;
  marketValue: number;
  squad: Player[];
}

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface Coach {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth: string;
  nationality: string;
  contract: Contract;
}

export interface Contract {
  start: string;
  until: string;
}

export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
  shirtNumber?: number;
  marketValue?: number;
  contract?: Contract;
}
