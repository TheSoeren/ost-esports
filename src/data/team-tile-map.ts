import TeamTile from '~/components/teams/team-tile'
import LolTeamTile from '~/components/league-of-legends/team-tile'

const tileMapping = {
  'League of Legends': LolTeamTile,
}

const isKeyOfTileMapping = (game: string): game is keyof typeof tileMapping => {
  if (game in tileMapping) {
    return true
  }

  return false
}

export default function getTeamTile(game: string) {
  if (isKeyOfTileMapping(game)) {
    return tileMapping[game]
  }

  return TeamTile
}
