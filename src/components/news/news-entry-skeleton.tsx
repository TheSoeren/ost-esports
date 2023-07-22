import { component$ } from '@builder.io/qwik'

export default component$(() => (
  <div role="status" class="animate-pulse mt-8">
    <div class="h-4 bg-gray-300 rounded-full w-1/3 mb-4"></div>
    <div class="h-0.5 bg-gray-300 rounded-full w-full mb-4"></div>
    <div class="h-2 bg-gray-300 rounded-full w-2/5 mb-2.5"></div>
    <div class="h-2 bg-gray-300 rounded-full w-1/2 mb-2.5"></div>
    <div class="h-2 bg-gray-300 rounded-full w-1/4"></div>
    <span class="sr-only">Loading...</span>
  </div>
))
