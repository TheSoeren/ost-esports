import type { ClassList } from '@builder.io/qwik'
import { component$ } from '@builder.io/qwik'

export default component$(({ class: className }: { class?: ClassList }) => (
  <div role="status" class={[`animate-pulse flex gap-10`, className ?? '']}>
    <div class="h-44 w-full bg-gray-300 rounded"></div>
    <span class="sr-only">Loading...</span>
  </div>
))
