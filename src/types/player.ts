import { Area, Competition } from "@/types";

export interface PlayerResponse {
  status: number;
  player: Player;
}

export interface Player {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  position: string;
  shirtNumber: number;
  lastUpdated: string;
  currentTeam: CurrentTeam;
}

export interface CurrentTeam {
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
  contract: {
    start: string;
    until: string;
  };
}
