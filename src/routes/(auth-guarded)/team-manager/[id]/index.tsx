import { component$ } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'

export default component$(() => {
  const { params } = useLocation()

  return (
    <section>
      <h1 class="dashboard-title">Team Bearbeiten</h1>
    </section>
  )
})
