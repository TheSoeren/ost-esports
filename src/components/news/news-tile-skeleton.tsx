import type { ClassList } from '@builder.io/qwik'
import { component$ } from '@builder.io/qwik'

export default component$(({ cssClass }: { cssClass?: ClassList }) => (
  <div role="status" class={[`animate-pulse flex gap-10`, cssClass ?? '']}>
    <div class="h-44 w-full bg-gray-300 rounded dark:border-gray-200"></div>
    <span class="sr-only">Loading...</span>
  </div>
))
