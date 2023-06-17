import {
  component$,
  noSerialize,
  Resource,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import { type DocumentHead, useLocation } from '@builder.io/qwik-city'
import styles from '~/css/teams/index.css?inline'
import type { ListResult, Team } from '~/types'
import getTeamTile from '~/data/teams/team-tile-mapping'
import pb from '~/pocketbase'
import BackButton from '~/components/elements/back-button'

export default component$(() => {
  useStylesScoped$(styles)

  const { params } = useLocation()
  const TeamTile = getTeamTile(params.id)
  const teamsResource = useResource$<ListResult<Team>>(async () => {
    const response = await pb
      .collection('teams')
      .getList<Team>(1, 30, { filter: `game="${params.id}"` })
    noSerialize(response)
    return response
  })

  return (
    <article>
      <BackButton href="/games" label="Game Auswahl" />
      <div class="teams__container">
        <Resource
          value={teamsResource}
          onResolved={(teams) => (
            <>
              {teams.items.map((team) => (
                <TeamTile key={team.id} {...team} />
              ))}
            </>
          )}
        />
      </div>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - Teams',
}
