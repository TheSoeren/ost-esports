import type { QRL, Signal } from '@builder.io/qwik'
import { useOnDocument, $ } from '@builder.io/qwik'

function useClickOutside(
  ref: Signal<HTMLElement | undefined>,
  callback: QRL<(event: MouseEvent) => void>
) {
  const onClick = $((event: MouseEvent) => {
    if (!ref.value) {
      return
    }

    const target = event.target as HTMLElement
    if (!ref.value.contains(target)) {
      callback(event)
    }
  })

  useOnDocument('click', onClick)
}

export default useClickOutside
