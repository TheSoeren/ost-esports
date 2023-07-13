import { component$ } from '@builder.io/qwik'

export default component$(() => (
  <div role="status" class="animate-pulse flex flex-col sm:flex-row gap-7">
    <div class="h-[88px] w-full bg-gray-300 rounded dark:border-gray-200"></div>
    <span class="sr-only">Loading...</span>
  </div>
))
