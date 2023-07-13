import { component$ } from '@builder.io/qwik'
import InputError from './input-error'
import {
  type PropFunction,
  type QwikChangeEvent,
  type QwikFocusEvent,
} from '@builder.io/qwik'

interface CheckboxProps {
  ref: PropFunction<(element: Element) => void>
  name: string
  value?: string
  checked?: boolean
  onInput$: PropFunction<(event: Event, element: HTMLInputElement) => void>
  onChange$: PropFunction<
    (
      event: QwikChangeEvent<HTMLInputElement>,
      element: HTMLInputElement
    ) => void
  >
  onBlur$: PropFunction<
    (event: QwikFocusEvent<HTMLInputElement>, element: HTMLInputElement) => void
  >
  required?: boolean
  class?: string
  label: string
  error?: string
}

export default component$(
  ({ label, error, class: className, ...props }: CheckboxProps) => {
    const { name, required } = props
    return (
      <div class={['pl-2', className]}>
        <label class="flex select-none space-x-2 font-medium">
          <input
            {...props}
            class="mt-1 h-4 w-4 cursor-pointer accent-ost-purple"
            type="checkbox"
            id={name}
            aria-invalid={!!error}
            aria-errormessage={`${name}-error`}
          />
          <span>{label}</span>
          {required && <span class="text-red-600">*</span>}
        </label>
        <InputError name={name} error={error} />
      </div>
    )
  }
)
