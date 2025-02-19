import { IPlayer } from "@/model";

const TIER_LIST = [
  "IRON",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "EMERALD",
  "DIAMOND",
  "MASTER",
  "GRANDMASTER",
  "CHALLENGER",
];
const RANK_LIST = ["IV", "III", "II", "I"];

export const compareRank = (a: IPlayer, b: IPlayer) => {
  if (TIER_LIST.indexOf(b.league.tier) > TIER_LIST.indexOf(a.league.tier)) {
    return 1;
  } else if (
    TIER_LIST.indexOf(b.league.tier) < TIER_LIST.indexOf(a.league.tier)
  ) {
    return -1;
  } else {
    if (RANK_LIST.indexOf(b.league.rank) > RANK_LIST.indexOf(a.league.rank)) {
      return 1;
    } else if (
      RANK_LIST.indexOf(b.league.rank) < RANK_LIST.indexOf(a.league.rank)
    ) {
      return -1;
    } else {
      return b.league.leaguePoints - a.league.leaguePoints;
    }
  }
};
