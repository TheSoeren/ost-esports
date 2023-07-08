import TeamTile from '~/components/teams/team-tile'
import LolTeamTile from '~/components/teams/league-of-legends/team-tile'
import type { ListResult } from 'pocketbase'
import type { Team } from '~/types'
import type { PlTeamDetailed } from '~/types/primeleague'

export const LEAGUE_OF_LEGENDS = '24n3v5bb5x7yixv'

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

interface LoLSpecificData {
  plTeamList: PlTeamDetailed[]
}

export type ResolvedGameSpecificData = LoLSpecificData // | ValorantSpecificData etc...
type GameDataFunction = (
  teams: ListResult<Team>
) => Promise<ResolvedGameSpecificData>
type DataMapping = Record<string, GameDataFunction>

const dataMapping: DataMapping = {
  [LEAGUE_OF_LEGENDS]: leagueOfLegendsData,
}

export async function getGameSpecificData(
  teams: ListResult<Team>,
  gameId: string
) {
  return await dataMapping[gameId](teams)
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
    .filter((team) => !!(team.gameSpecificData.plTeamId as number))
    .map((team) => team.gameSpecificData.plTeamId as number)

  const plTeamList = await Promise.all(
    registeredTeams.map((plTeamId: number) =>
      fetch(`https://www.primebot.me/api/teams/${plTeamId}`)
    )
  ).then((responses) => Promise.all(responses.map((res) => res.json())))

  if (plTeamList.length) {
    return { plTeamList }
  }

  return { plTeamList: [] }
}
