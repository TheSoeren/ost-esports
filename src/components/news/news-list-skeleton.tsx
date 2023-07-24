import { component$ } from '@builder.io/qwik'
import NewsTileSkeleton from './news-tile-skeleton'

export default component$(() => (
  <div class="grid gap-5 grid-cols-3">
    <NewsTileSkeleton class="col-span-3 sm:col-span-2" />
    <NewsTileSkeleton class="col-span-3 sm:col-span-1" />
    <NewsTileSkeleton class="col-span-3 sm:col-span-1" />
  </div>
))
