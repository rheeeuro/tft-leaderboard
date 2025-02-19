export interface LeagueEntryDto {
  puuid: string;
  leagueId: string;
  summonerId: string;
  queueType: string;
  ratedTier?: string;
  ratedRating?: number;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  hotStreak: boolean;
  veteran: boolean;
  freshBlood: boolean;
  inactive: boolean;
  miniSeries?: MiniSeriesDto;
}

export interface MiniSeriesDto {
  losses: number;
  progress: string;
  target: number;
  wins: number;
}
