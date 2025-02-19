import { LeagueEntryDto } from "./league.interface";
import { SummonerDto } from "./summoner.interface";

export interface IPlayer {
  id: string;
  gameName: string;
  tagLine: string;
  summoner: SummonerDto;
  league: LeagueEntryDto;
  placements: number[];
  updatedAt: number;
}
