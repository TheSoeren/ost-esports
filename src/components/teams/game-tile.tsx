import { component$, useSignal, useTask$ } from '@builder.io/qwik'
import type { Game } from '~/types'

export function random() {
  return Math.round(Math.random())
}

export default component$(({ collectionId, id, image, name }: Game) => {
  const data = useSignal({ src: '', url: '/error' })

  useTask$(({ track }) => {
    track(() => name)
    data.value.url = name.toLowerCase().replace(' ', '-')
  })

  useTask$(({ track }) => {
    track(() => image)
    data.value.src = `http://159.69.196.31/api/files/${collectionId}/${id}/${image}`
  })

  return (
    <section
      class={['games__tile', random() ? 'hover:-rotate-1' : 'hover:rotate-1']}
    >
      <a href={data.value.url} class="games__tile-link">
        <img src={data.value.src} alt={name} class="games__tile-image" />
      </a>
    </section>
  )
})
