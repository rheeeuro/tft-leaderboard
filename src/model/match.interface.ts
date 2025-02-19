export interface MatchDto {
  metadata: MetadataDto;
  info: InfoDto;
}

export interface MetadataDto {
  data_version: string;
  match_id: string;
  participants: string[];
}

export interface InfoDto {
  game_datetime: number;
  game_length: number;
  game_variation: string;
  game_version: string;
  participants: ParticipantDto[];
  queue_id: number;
  tft_set_number: number;
}

export interface ParticipantDto {
  companion?: {
    content_ID: string;
    item_ID: number;
    skin_ID: number;
    species: string;
  };
  gold_left: number;
  last_round: number;
  level: number;
  placement: number;
  players_eliminated: number;
  puuid: string;
  riotIdGameName: string;
  riotIdTagline: string;
  time_eliminated: number;
  total_damage_to_players: number;
  traits: TraitDto[];
  units: UnitDto[];
}

export interface TraitDto {
  name: string;
  num_units: number;
  style: number;
  tier_current: number;
  tier_total: number;
}

export interface UnitDto {
  items: number[];
  character_id: string;
  chosen: string;
  name: string;
  rarity: number;
  tier: number;
}
