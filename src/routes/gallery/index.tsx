import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return <h1 class="text-2xl">Gallery</h1>
})

export const head: DocumentHead = {
  title: 'OST eSports - Gallerie',
}
