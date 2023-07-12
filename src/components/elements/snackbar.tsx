import type { QRL } from '@builder.io/qwik'
import { component$, useStylesScoped$ } from '@builder.io/qwik'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from 'qwik-fontawesome'
import type { Snackbar, SnackbarType } from '~/contexts/SnackbarContext'
import styles from '~/css/elements/snackbar.css?inline'

type IconMapping = { [K in SnackbarType]: IconProp }
export const icon: IconMapping = {
  success: faCircleCheck,
  info: faCircleInfo,
  warn: faTriangleExclamation,
  error: faCircleExclamation,
}

interface SnackbarProps {
  snackbar: Snackbar
  onClick$: QRL<() => void>
}

export default component$(({ snackbar, onClick$ }: SnackbarProps) => {
  useStylesScoped$(styles)

  return (
    <div
      class={`snackbar snackbar--${snackbar.type}`}
      role="alert"
      onClick$={onClick$}
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <FaIcon icon={icon[snackbar.type]} />
        </div>
        <div class="ml-4">
          <h3 class="text-sm font-semibold">{snackbar.title}</h3>
          {snackbar.message && (
            <div class="snackbar__message">{snackbar.message}</div>
          )}
        </div>
      </div>
    </div>
  )
})
