import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import type { Game } from '~/types'
import styles from '~/css/games/games-tile.css?inline'
import usePocketbase from '~/hooks/usePocketBase'

export function random() {
  return Math.round(Math.random())
}

export default component$(({ image, name, ...record }: Game) => {
  useStylesScoped$(styles)
  const pb = usePocketbase()

  return (
    <section
      class={['games__tile', random() ? 'hover:-rotate-1' : 'hover:rotate-1']}
    >
      <Link
        href={record.id}
        class="absolute top-0 left-0 h-full w-full rounded-lg"
      >
        <img
          src={pb.files.getUrl(record, image)}
          alt={name}
          class="games__tile-image"
        />
      </Link>
    </section>
  )
})
