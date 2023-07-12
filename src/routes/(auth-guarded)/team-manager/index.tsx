import { component$, useStyles$ } from '@builder.io/qwik'
import { Link, type DocumentHead } from '@builder.io/qwik-city'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from 'qwik-fontawesome'
import styles from '~/css/teams/team-manager.css?inline'

export default component$(() => {
  useStyles$(styles)

  return (
    <section>
      <h1 class="dashboard-title">Team Manager</h1>
      <div class="team-manager__container">
        <Link class="btn-outline team-manager__add" href="create">
          <FaIcon icon={faPlus} />
        </Link>
        <Link class="tile cursor-pointer" href="test">
          <h2 class="team-manager__title">OST Xenon</h2>
          <h2 class="team-manager__game">League of Legends</h2>
        </Link>
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'Dashboard | Team Manager',
}
