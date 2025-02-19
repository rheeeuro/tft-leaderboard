import { LeagueEntryDto } from "@/model";
import { instanceKR } from "./api";

export const getLeague = async (params: {
  summonerId: string;
}): Promise<LeagueEntryDto[]> => {
  const { data } = await instanceKR.get(
    `/tft/league/v1/entries/by-summoner/${params.summonerId}`
  );
  return data;
};
