import { MatchDto } from "@/model/match.interface";
import { instanceAsia } from "./api";

export const getMatchIds = async (params: {
  puuid: string;
}): Promise<string[]> => {
  const { data } = await instanceAsia.get(
    `/tft/match/v1/matches/by-puuid/${params.puuid}/ids?count=10`
  );
  return data;
};

export const getMatch = async (params: {
  matchId: string;
}): Promise<MatchDto> => {
  const { data } = await instanceAsia.get(
    `/tft/match/v1/matches/${params.matchId}`
  );
  return data;
};
