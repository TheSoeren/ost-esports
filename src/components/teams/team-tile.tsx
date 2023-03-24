import { component$, useSignal } from '@builder.io/qwik'
import type { Team } from '~/types'

export default component$(({ id, name, game }: Team) => {
  const src = useSignal('')

  return (
    <section class="teams__tile">
        <div>Id: {id}</div>
        <div>Name: {name}</div>
        <div>Game ID: {game}</div>
    </section>
  )
})
