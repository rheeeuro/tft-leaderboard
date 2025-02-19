import { SummonerDto } from "@/model";
import { instanceKR } from "./api";

export const getSummoner = async (params: {
  puuid: string;
}): Promise<SummonerDto> => {
  const { data } = await instanceKR.get(
    `/tft/summoner/v1/summoners/by-puuid/${params.puuid}`
  );
  return data;
};
