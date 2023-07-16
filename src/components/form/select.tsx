import {
  component$,
  useSignal,
  useTask$,
  type PropFunction,
  type QwikChangeEvent,
  type QwikFocusEvent,
} from '@builder.io/qwik'
import InputError from './input-error'
import InputLabel from './input-label'
import { FaIcon } from 'qwik-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export interface SelectValue {
  label: string
  value: string
}

interface SelectProps {
  ref: PropFunction<(element: Element) => void>
  name: string
  value: string | string[] | null | undefined
  onInput$: PropFunction<(event: Event, element: HTMLSelectElement) => void>
  onChange$: PropFunction<
    (
      event: QwikChangeEvent<HTMLSelectElement>,
      element: HTMLSelectElement
    ) => void
  >
  onBlur$: PropFunction<
    (
      event: QwikFocusEvent<HTMLSelectElement>,
      element: HTMLSelectElement
    ) => void
  >
  options: SelectValue[]
  multiple?: boolean
  size?: number
  placeholder?: string
  required?: boolean
  class?: string
  label?: string
  error?: string
}

/**
 * Select field that allows users to select predefined values. Various
 * decorations can be displayed in or around the field to communicate the
 * entry requirements.
 */
export default component$(
  ({ value, options, label, error, ...props }: SelectProps) => {
    const { name, required, multiple, placeholder } = props

    // Create computed value of selected values
    const values = useSignal<string[]>()
    useTask$(({ track }) => {
      track(() => value)
      values.value = Array.isArray(value)
        ? value
        : value && typeof value === 'string'
        ? [value]
        : []
    })

    return (
      <div class={[error ? 'mb-3' : 'mb-6', props.class]}>
        <InputLabel name={name} label={label} required={required} />
        <div class="relative flex items-center">
          <select
            {...props}
            class={[
              'w-full appearance-none rounded border bg-transparent py-3 px-4 outline-none text-sm',
              error ? 'border-red-600/50' : 'border-gray-700',
              multiple ? 'py-5' : 'h-[46px]',
              placeholder && !values.value?.length && 'text-slate-500',
            ]}
            id={name}
            aria-invalid={!!error}
            aria-errormessage={`${name}-error`}
          >
            <option value="" disabled hidden selected={!value}>
              {placeholder}
            </option>
            {options.map(({ label, value }) => (
              <option
                key={value}
                value={value}
                selected={values.value?.includes(value)}
              >
                {label}
              </option>
            ))}
          </select>
          {!multiple && (
            <FaIcon
              icon={faAngleDown}
              class="text-sm pointer-events-none absolute right-6"
            />
          )}
        </div>
        <InputError name={name} error={error} />
      </div>
    )
  }
)
