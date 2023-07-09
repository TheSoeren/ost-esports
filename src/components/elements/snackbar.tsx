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

export default component$(({ type, title, message }: Snackbar) => {
  useStylesScoped$(styles)

  return (
    <div class={`snackbar snackbar--${type}`} role="alert">
      <div class="flex">
        <div class="flex-shrink-0">
          <FaIcon icon={icon[type]} />
        </div>
        <div class="ml-4">
          <h3 class="text-sm font-semibold">{title}</h3>
          {message && <div class="snackbar__message">{message}</div>}
        </div>
      </div>
    </div>
  )
})
