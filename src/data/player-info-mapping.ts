import PlayerInfo from '~/components/teams/player-info'
import LolPlayerInfo from '~/components/league-of-legends/player-info'

const componentMapping = {
  '24n3v5bb5x7yixv': LolPlayerInfo,
}

const isKeyOfTileMapping = (
  gameId: string
): gameId is keyof typeof componentMapping => {
  if (gameId in componentMapping) {
    return true
  }

  return false
}

export default function getPlayerInfo(gameId: string) {
  if (isKeyOfTileMapping(gameId)) {
    return componentMapping[gameId]
  }

  return PlayerInfo
}
