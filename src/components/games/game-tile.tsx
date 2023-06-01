import { component$, useSignal, useTask$ } from '@builder.io/qwik'
import type { Game } from '~/types'

export function random() {
  return Math.round(Math.random())
}

export default component$(({ collectionId, id, image, name }: Game) => {
  const src = useSignal('')

  useTask$(({ track }) => {
    track(() => image)
    src.value = `http://159.69.196.31/api/files/${collectionId}/${id}/${image}`
  })

  return (
    <section
      class={['games__tile', random() ? 'hover:-rotate-1' : 'hover:rotate-1']}
    >
      <a href={id} class="games__tile-link">
        <img src={src.value} alt={name} class="games__tile-image" />
      </a>
    </section>
  )
})
