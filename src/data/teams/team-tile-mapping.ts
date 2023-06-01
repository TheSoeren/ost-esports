import TeamTile from '~/components/teams/team-tile'
import LolTeamTile from '~/components/teams/league-of-legends/team-tile'

const componentMapping = {
  '24n3v5bb5x7yixv': LolTeamTile,
}

const isKeyOfTileMapping = (
  gameId: string
): gameId is keyof typeof componentMapping => {
  if (gameId in componentMapping) {
    return true
  }

  return false
}

export default function getTeamTile(gameId: string) {
  if (isKeyOfTileMapping(gameId)) {
    return componentMapping[gameId]
  }

  return TeamTile
}
