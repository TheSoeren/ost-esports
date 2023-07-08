import type { ClassList, QRL } from '@builder.io/qwik'
import { component$ } from '@builder.io/qwik'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FaIcon } from 'qwik-fontawesome'

interface IconButtonProps {
  icon: IconProp
  onClick$: QRL<() => void>
  cssClass?: ClassList
}

export default component$(({ icon, onClick$, cssClass }: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick$={onClick$}
      class={[
        'h-fit px-2 py-3 inline-flex items-center justify-center rounded-md transition-all text-white hover:bg-ost-violet',
        cssClass ?? '',
      ]}
    >
      <FaIcon icon={icon} fixedWidth />
    </button>
  )
})
