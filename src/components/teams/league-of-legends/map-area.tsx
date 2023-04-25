import { type QRL, component$, useTask$ } from '@builder.io/qwik'
import useHover from '~/hooks/useHover'

interface MapAreaProps {
  coordinates: string
  onMouseEnter: QRL<() => void>
  onMouseLeave: QRL<() => void>
}

export default component$(
  ({ coordinates, onMouseEnter, onMouseLeave }: MapAreaProps) => {
    const hovering = useHover()

    useTask$(({ track }) => {
      track(() => hovering)

      if (onMouseEnter && hovering) {
        onMouseEnter()
      }

      if (onMouseLeave && !hovering) {
        onMouseLeave()
      }
    })

    return <area coords={coordinates} shape="poly" class="map-area" />
  }
)
