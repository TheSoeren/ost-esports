import type { FormStore } from '@modular-forms/qwik'
import type { TeamFormSchema } from '~/components/teams/form/team-form'
import type { Record as PbRecord } from './pocketbase'

interface LeagueOfLegendsData {
  plTeamId: number
}

export type GameSpecificData = LeagueOfLegendsData // | ValorantData | CsData etc..

export interface Team extends PbRecord {
  name: string
  game: string
  hidden: boolean
  gameSpecificData: GameSpecificData
}

export interface Membership extends PbRecord {
  team: string
  user: string
  roleIcon: string
}

export interface GameSpecificForm {
  of: FormStore<TeamFormSchema, TeamFormSchema>
}
