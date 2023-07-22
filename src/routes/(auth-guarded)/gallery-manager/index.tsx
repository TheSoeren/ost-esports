import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return <article>Gallery Manager</article>
})

export const head: DocumentHead = {
  title: 'Dashboard | Galerie Manager',
}
