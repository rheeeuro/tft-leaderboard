import { AccountDto } from "@/model";
import { instanceUS } from "./api";

export const getAccount = async (params: {
  tagLine: string;
  gameName: string;
}): Promise<AccountDto> => {
  const { data } = await instanceUS.get(
    `/riot/account/v1/accounts/by-riot-id/${params.gameName}/${params.tagLine}`
  );
  return data;
};
