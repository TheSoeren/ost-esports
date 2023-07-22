import { LEAGUE_OF_LEGENDS } from './game-id'
import LeagueOfLegendsForm from '~/components/teams/form/league-of-legends-form'
import EmptyGameForm from '~/components/teams/form/empty-game-form'
import type { Maybe } from '@modular-forms/qwik'

export const gameFormMapping = {
  [LEAGUE_OF_LEGENDS]: LeagueOfLegendsForm,
}

export const isKeyOfGameFormMapping = (
  gameId: string
): gameId is keyof typeof gameFormMapping => {
  if (gameId in gameFormMapping) {
    return true
  }

  return false
}

export async function getGameSpecificForm(game: Maybe<string>) {
  if (game && isKeyOfGameFormMapping(game)) {
    return gameFormMapping[game]
  }

  return EmptyGameForm
}
