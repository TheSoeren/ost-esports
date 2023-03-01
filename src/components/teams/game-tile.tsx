import { component$ } from '@builder.io/qwik'

interface GameTileProps {
  src: string
  href: string
  alt: string
}

export function random() {
  return Math.round(Math.random())
}

export default component$(({ src, href, alt }: GameTileProps) => {
  return (
    <section
      class={['games__tile', random() ? 'hover:-rotate-1' : 'hover:rotate-1']}
    >
      <a href={href} class="games__tile-link">
        <img src={src} alt={alt} class="games__tile-image" />
      </a>
    </section>
  )
})
