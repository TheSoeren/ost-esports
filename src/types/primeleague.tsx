/*
 * Types to cover api responses of https://www.primebot.me/api/#/
 */

export interface PlListResult<T> {
  count: number
  next: null // find out type
  previous: null // find out type
  results: T[]
}

export interface PlTeam {
  id: number
  name: string
  team_tag: string
  prime_league_link: string
  matches_count?: number
  updated_at: string
}

export interface PlTeamDetailed extends Omit<PlTeam, 'matches_count'> {
  division: null // find out type
  logo_url: string
  players: PlPlayer[]
  matches: PlMatch[]
}

export interface PlPlayer {
  id: number
  summoner_name: string
  name: string
  is_leader: boolean
  updated_at: string
}

export interface PlMatch {
  match_id: number
  prime_league_link: string
  begin: string | null
  result: string | null
  match_day: number
  match_type: 'league'
  updated_at: string
  enemy_team: PlTeam
  team_lineup: PlPlayer[]
  enemy_lineup: PlPlayer[]
}
