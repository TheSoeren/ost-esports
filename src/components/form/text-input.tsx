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

interface TextInputProps {
  ref: PropFunction<(element: Element) => void>
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'number' | 'date'
  name: string
  value: string | number | undefined
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
  placeholder?: string
  required?: boolean
  class?: string
  label?: string
  error?: string
  form?: string
}

export default component$(
  ({ label, value, error, ...props }: TextInputProps) => {
    const { name, required } = props

    const input = useSignal<string | number>()
    useTask$(({ track }) => {
      if (!Number.isNaN(track(() => value))) {
        input.value = value
      }
    })

    return (
      <div class={[error ? 'mb-3' : 'mb-6', props.class]}>
        <InputLabel name={name} label={label} required={required} />
        <input
          {...props}
          class={[
            'block w-full border rounded py-3 px-4 text-sm',
            error ? 'border-2 border-red-600' : 'border-gray-700',
          ]}
          id={name}
          value={input.value}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        <InputError name={name} error={error} />
      </div>
    )
  }
)
