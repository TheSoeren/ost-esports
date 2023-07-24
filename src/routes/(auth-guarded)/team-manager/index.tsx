import {
  Resource,
  component$,
  useContext,
  useResource$,
  useStyles$,
} from '@builder.io/qwik'
import { Link, type DocumentHead } from '@builder.io/qwik-city'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from 'qwik-fontawesome'
import DataManagerSkeleton from '~/components/elements/data-manager-skeleton'
import { AuthContext } from '~/contexts/AuthContext'
import type { Game, Team } from '~/types'
import { Collection } from '~/types'
import styles from '~/css/teams/team-manager.css?inline'

export default component$(() => {
  useStyles$(styles)
  const { pocketbase, authenticated, authUser } = useContext(AuthContext)

  const teamsResource = useResource$<Team[]>(async ({ track }) => {
    track(() => authenticated.value)
    const qrlPb = await pocketbase()
    if (!authUser.value) return []

    const response: Team[] = await qrlPb
      .collection(Collection.TEAMS)
      .getFullList({
        filter: `captain="${authUser.value.id}"`,
        expand: 'game',
      })

    return structuredClone(response)
  })

  return (
    <section>
      <h1 class="dashboard-title">Team Manager</h1>
      <div class="team-manager">
        <Link class="btn-outline team-manager__add" href="create">
          <FaIcon icon={faPlus} />
        </Link>

        <Resource
          value={teamsResource}
          onPending={() => <DataManagerSkeleton />}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(teams) => (
            <>
              {teams.map((team) => (
                <Link class="tile cursor-pointer" href={team.id} key={team.id}>
                  <h2 class="team-manager__title">{team.name}</h2>
                  <h2 class="team-manager__game">
                    {(team.expand.game as Game).name}
                  </h2>
                </Link>
              ))}
            </>
          )}
        />
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'Dashboard | Team Manager',
}
