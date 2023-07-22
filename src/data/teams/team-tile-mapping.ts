import TeamTile from '~/components/teams/team-tile'
import LolTeamTile from '~/components/teams/league-of-legends/team-tile'
import type { ListResult } from 'pocketbase'
import type { Team } from '~/types'
import type { PlTeamDetailed } from '~/types/primeleague'
import { LEAGUE_OF_LEGENDS } from '../games/game-id'

const componentMapping = {
  [LEAGUE_OF_LEGENDS]: LolTeamTile,
}

const isKeyOfTileMapping = (
  gameId: string
): gameId is keyof typeof componentMapping => {
  if (gameId in componentMapping) {
    return true
  }

  return false
}

export function getTeamTile(gameId: string) {
  if (isKeyOfTileMapping(gameId)) {
    return componentMapping[gameId]
  }

  return TeamTile
}

export interface LoLSpecificData {
  plTeamList: PlTeamDetailed[]
}

export type ResolvedGameSpecificData = LoLSpecificData | {} // | ValorantSpecificData etc...
type GameDataFunction = (
  teams: ListResult<Team>
) => Promise<ResolvedGameSpecificData>
type DataMapping = Record<string, GameDataFunction>

const dataMapping: DataMapping = {
  [LEAGUE_OF_LEGENDS]: leagueOfLegendsData,
}

const isKeyOfDataMapping = (
  gameId: string
): gameId is keyof typeof dataMapping => {
  if (gameId in dataMapping) {
    return true
  }

  return false
}

export async function getGameSpecificData(
  teams: ListResult<Team>,
  gameId: string
) {
  if (isKeyOfDataMapping(gameId)) {
    return dataMapping[gameId](teams)
  }

  return {}
}

export const isLeagueOfLegendsData = (
  data: ResolvedGameSpecificData
): data is LoLSpecificData => {
  if ('plTeamList' in data) {
    return true
  }

  return false
}

async function leagueOfLegendsData(
  teams: ListResult<Team>
): Promise<LoLSpecificData> {
  const registeredTeams = teams.items
    .filter((team) => !!team.gameSpecificData?.plTeamId)
    .map((team) => team.gameSpecificData.plTeamId)

  const plTeamList = await Promise.all(
    registeredTeams.map((plTeamId: number) =>
      fetch(`https://www.primebot.me/api/teams/${plTeamId}`)
    )
  ).then((responses) => Promise.all(responses.map((res) => res.json())))

  if (plTeamList.length) {
    return { plTeamList: plTeamList.filter((plTeam) => !!plTeam.id) }
  }

  return { plTeamList: [] }
}
