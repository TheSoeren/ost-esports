import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { type DocumentHead, useLocation } from '@builder.io/qwik-city'
import styles from '~/css/teams/index.css?inline'
import { getTeamTile } from '~/data/teams/team-tile-mapping'
import BackButton from '~/components/elements/back-button'
import { useTeamData } from '~/routes/layout'

export default component$(() => {
  useStylesScoped$(styles)

  const { params } = useLocation()
  const TeamTile = getTeamTile(params.id)
  const teamsResource = useTeamData()

  return (
    <article>
      <BackButton href="/games" label="Game Auswahl" />
      <div class="teams__container">
        {teamsResource.value.teams.items.map((team) => (
          <TeamTile key={team.id} {...team} />
        ))}
      </div>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - Teams',
}
