import { component$ } from '@builder.io/qwik'

export default component$(() => (
  <div role="status" class="animate-pulse flex flex-col sm:flex-row gap-7">
    <div class="h-80 w-80 bg-gray-300 rounded dark:border-gray-200"></div>
    <div class="h-80 w-80 bg-gray-300 rounded dark:border-gray-200"></div>
    <span class="sr-only">Loading...</span>
  </div>
))
