import { Collection } from '~/types/pocketbase'
import pb from './pocketbase'

import type { Team } from '~/types'
import { LEAGUE_OF_LEGENDS } from '~/data/games/game-id'
import type { TeamFormSchema } from '~/components/teams/form/team-form'

export async function getTeamsByCaptain(captain: string) {
  return pb.collection(Collection.TEAMS).getFullList<Team>({
    filter: `captain="${captain}"`,
    expand: 'game',
  })
}

export async function getTeamsByGameId(id: string) {
  return pb.collection(Collection.TEAMS).getFullList<Team>({
    filter: `game="${id}" && hidden=false`,
    expand: 'membership(team).user',
    $cancelKey: id,
  })
}

export async function getLolTeams() {
  return pb.collection(Collection.TEAMS).getFullList<Team>({
    filter: `game="${LEAGUE_OF_LEGENDS}"`,
    expand: 'membership(team).user',
    $cancelKey: LEAGUE_OF_LEGENDS,
  })
}

export async function getTeamById(id: string) {
  return pb.collection(Collection.TEAMS).getOne<Team>(id)
}

export async function createTeam(values: TeamFormSchema) {
  return pb.collection(Collection.TEAMS).create<Team>(values)
}

export async function updateTeam(id: string, value: TeamFormSchema) {
  return pb.collection(Collection.TEAMS).update<Team>(id, value)
}

export async function deleteTeam(id: string) {
  return pb.collection(Collection.TEAMS).delete(id)
}
