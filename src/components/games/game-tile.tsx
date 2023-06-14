import { component$ } from '@builder.io/qwik'
import pb from '~/pocketbase'
import type { Game } from '~/types'

export function random() {
  return Math.round(Math.random())
}

export default component$(({ image, name, ...record }: Game) => {
  return (
    <section
      class={['games__tile', random() ? 'hover:-rotate-1' : 'hover:rotate-1']}
    >
      <a href={record.id} class="games__tile-link">
        <img
          src={pb.files.getUrl(record, image)}
          alt={name}
          class="games__tile-image"
        />
      </a>
    </section>
  )
})
