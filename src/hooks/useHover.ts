import { $, useOn, useSignal } from '@builder.io/qwik'

export default function useHover() {
  const isHover = useSignal(false)

  useOn(
    'mouseover',
    $(() => {
      isHover.value = true
    })
  )

  useOn(
    'mouseleave',
    $(() => {
      isHover.value = false
    })
  )

  return isHover.value
}
