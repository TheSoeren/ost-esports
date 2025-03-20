import { Collection } from '~/types/pocketbase'
import type { Team } from '~/types'
import { LEAGUE_OF_LEGENDS } from '~/data/games/game-id'
import type { TeamFormSchema } from '~/components/teams/form/team-form'
import clientPb from '~/data/pocketbase'

export async function getTeamsByCaptain(captain: string, pb = clientPb) {
  return pb.collection(Collection.TEAMS).getFullList<Team>({
    filter: `captain="${captain}"`,
    expand: 'game',
  })
}

export async function getTeamsByGameId(id: string, pb = clientPb) {
  return pb.collection(Collection.TEAMS).getFullList<Team>({
    filter: `game="${id}" && hidden=false`,
    expand: 'membership(team).user',
    $cancelKey: id,
  })
}

export async function getLolTeams(pb = clientPb) {
  return pb.collection(Collection.TEAMS).getFullList<Team>({
    filter: `game="${LEAGUE_OF_LEGENDS}"`,
    expand: 'membership(team).user',
    $cancelKey: LEAGUE_OF_LEGENDS,
  })
}

export async function getTeamById(id: string, pb = clientPb) {
  return pb.collection(Collection.TEAMS).getOne<Team>(id)
}

export async function createTeam(values: TeamFormSchema, pb = clientPb) {
  return pb.collection(Collection.TEAMS).create<Team>(values)
}

export async function updateTeam(
  id: string,
  value: TeamFormSchema,
  pb = clientPb
) {
  return pb.collection(Collection.TEAMS).update<Team>(id, value)
}

export async function deleteTeam(id: string, pb = clientPb) {
  return pb.collection(Collection.TEAMS).delete(id)
}
