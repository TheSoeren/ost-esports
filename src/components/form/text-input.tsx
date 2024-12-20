import { component$, useSignal, useTask$ } from '@builder.io/qwik'
import InputError from './input-error'
import InputLabel from './input-label'
import type {
  FieldElementProps,
  FieldPath,
  FieldValues,
} from '@modular-forms/qwik'

interface TextInputProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> extends FieldElementProps<TFieldValues, TFieldName> {
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'number' | 'date'
  value: string | number | undefined
  placeholder?: string
  required?: boolean
  class?: string
  label?: string
  error?: string
  form?: string
}

export default component$(
  <
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues>,
  >({
    label,
    value,
    error,
    ...props
  }: TextInputProps<TFieldValues, TFieldName>) => {
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
