import { component$, useStyles$ } from '@builder.io/qwik'
import { Link, routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from 'qwik-fontawesome'
import type { Game, Team } from '~/types'
import styles from '~/css/teams/team-manager.css?inline'
import { getEdgePbInstance } from '~/services/pocketbase-service'
import { getTeamsByCaptain } from '~/services/team-service'

export const useTeams = routeLoader$<Team[]>(async ({ cookie }) => {
  const pb = getEdgePbInstance(cookie)
  const authRecord = pb.authStore.record
  if (!authRecord) {
    return []
  }

  return getTeamsByCaptain(authRecord.id, pb)
})

export default component$(() => {
  useStyles$(styles)
  const teams = useTeams()

  return (
    <section>
      <h1 class="dashboard-title">Team Manager</h1>
      <div class="team-manager">
        <Link class="btn-outline team-manager__add" href="create">
          <FaIcon icon={faPlus} />
        </Link>

        {teams.value.map((team) => (
          <Link class="tile cursor-pointer" href={team.id} key={team.id}>
            <h2 class="team-manager__title">{team.name}</h2>
            <h2 class="team-manager__game">
              {(team.expand.game as Game).name}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'Team Manager',
}
