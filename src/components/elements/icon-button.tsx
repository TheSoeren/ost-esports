import type { QRL } from '@builder.io/qwik'
import { component$ } from '@builder.io/qwik'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FaIcon } from 'qwik-fontawesome'

interface IconButtonProps {
  icon: IconProp
  onClick$: QRL<() => void>
}

export default component$(({ icon, onClick$ }: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick$={onClick$}
      class="h-fit my-auto mx-3 p-2 py-3 inline-flex items-center rounded-md transition-all text-white hover:bg-ost-violet"
    >
      <FaIcon icon={icon} fixedWidth />
    </button>
  )
})
