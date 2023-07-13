import { component$ } from '@builder.io/qwik'

export default component$(() => (
  <div
    role="status"
    class="animate-pulse flex flex-col sm:flex-row gap-5 col-span-2"
  >
    <div class="h-72 w-72 bg-gray-300 rounded"></div>
    <div class="h-72 w-72 bg-gray-300 rounded"></div>
    <span class="sr-only">Loading...</span>
  </div>
))
