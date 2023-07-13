import { component$ } from '@builder.io/qwik'

export default component$(() => (
  <div
    role="status"
    class="animate-pulse flex flex-col sm:flex-row gap-5 col-span-2 mt-4"
  >
    <div class="h-32 w-full sm:w-64 my-auto bg-gray-300 rounded"></div>
    <div class="h-96 sm:h-64 w-full sm:w-44 bg-gray-300 rounded"></div>
    <span class="sr-only">Loading...</span>
  </div>
))
