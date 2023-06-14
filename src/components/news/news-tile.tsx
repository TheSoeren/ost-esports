import { component$ } from '@builder.io/qwik'
import type { NewsEntry } from '~/types'

export function random() {
  return Math.round(Math.random())
}

export default component$(({ title, content }: NewsEntry) => {
  return (
    <div>
      <div>{title}</div>

      {/* We can do `dangerouslySetInnerHTML` here because the content is sanitized by pocketbase */}
      <div class="prose" dangerouslySetInnerHTML={content}></div>
    </div>
  )
})
