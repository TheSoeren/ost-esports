import { component$ } from '@builder.io/qwik'
import NewsTileSkeleton from './news-tile-skeleton'

export default component$(() => (
  <div class="flex flex-col gap-5">
    <div class="flex gap-5">
      <NewsTileSkeleton cssClass="w-2/3" />
      <NewsTileSkeleton cssClass="w-1/3" />
    </div>
    <NewsTileSkeleton cssClass="w-1/3" />
  </div>
))
