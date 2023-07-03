import TeamTile from '~/components/teams/team-tile'
import LolTeamTile from '~/components/teams/league-of-legends/team-tile'

const LEAGUE_OF_LEGENDS = '24n3v5bb5x7yixv'

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

export function isLoL(gameId: string) {
  return gameId === LEAGUE_OF_LEGENDS
}

export function getTeamTile(gameId: string) {
  if (isKeyOfTileMapping(gameId)) {
    return componentMapping[gameId]
  }

  return TeamTile
}
