import TeamTile from '~/components/teams/team-tile'
import LolTeamTile from '~/components/teams/league-of-legends/team-tile'
import type { ListResult } from 'pocketbase'
import type { Team } from '~/types'

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

type GameDataFunction = (teams: ListResult<Team>) => any[] | Promise<any[]>
type DataMapping = Record<string, GameDataFunction>

const dataMapping: DataMapping = {
  [LEAGUE_OF_LEGENDS]: leagueOfLegendsData,
}

export function getGameSpecificData(teams: ListResult<Team>, gameId: string) {
  return dataMapping[gameId](teams)
}

async function leagueOfLegendsData(teams: ListResult<Team>) {
  const registeredTeams = teams.items
    .filter((team) => !!(team.gameSpecificData.plTeamId as number))
    .map((team) => team.gameSpecificData.plTeamId as number)

  const plTeamList = await Promise.all(
    registeredTeams.map((plTeamId: number) =>
      fetch(`https://www.primebot.me/api/teams/${plTeamId}`)
    )
  ).then((responses) => Promise.all(responses.map((res) => res.json())))

  if (plTeamList.length) {
    return plTeamList
  }

  return []
}
