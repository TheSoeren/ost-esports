import { component$ } from '@builder.io/qwik'

export default component$(({ cssClass }: { cssClass?: string }) => (
  <div
    role="status"
    class={`p-4 border border-gray-300 rounded shadow animate-pulse md:p-6 dark:border-gray-200 ${
      cssClass ?? ''
    }`}
  >
    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-48 mb-4"></div>
    <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-200 mb-2.5"></div>
    <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-200 mb-2.5"></div>
    <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-200"></div>
    <span class="sr-only">Loading...</span>
  </div>
))
