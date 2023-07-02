import { component$ } from '@builder.io/qwik'

export default component$(() => (
  <div role="status" class="animate-pulse flex gap-10 col-span-2">
    <div class="h-32 w-64 my-auto bg-gray-300 rounded dark:border-gray-200"></div>
    <div class="h-64 w-32 bg-gray-300 rounded dark:border-gray-200"></div>
    <span class="sr-only">Loading...</span>
  </div>
))
