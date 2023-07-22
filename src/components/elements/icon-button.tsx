import type { ClassList } from '@builder.io/qwik'
import { component$ } from '@builder.io/qwik'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FaIcon } from 'qwik-fontawesome'

interface IconButtonProps {
  icon: IconProp
  onClick$(): void
  class?: ClassList
}

export default component$(
  ({ icon, onClick$, class: className }: IconButtonProps) => {
    return (
      <button
        type="button"
        onClick$={onClick$}
        class={[
          'h-fit px-2 py-3 inline-flex items-center justify-center rounded transition-all text-white hover:bg-ost-purple',
          className ?? '',
        ]}
      >
        <FaIcon icon={icon} fixedWidth />
      </button>
    )
  }
)
