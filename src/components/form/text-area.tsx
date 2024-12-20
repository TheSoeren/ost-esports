import { component$, useSignal, useTask$ } from '@builder.io/qwik'
import InputError from './input-error'
import InputLabel from './input-label'
import type {
  FieldElementProps,
  FieldPath,
  FieldValues,
} from '@modular-forms/qwik'

interface TextAreaProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> extends FieldElementProps<TFieldValues, TFieldName> {
  id?: string
  value: string | undefined
  placeholder?: string
  required?: boolean
  class?: string
  label?: string
  error?: string
  form?: string
  rows?: number
  cols?: number
  disabled?: boolean
  readOnly?: boolean
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
  }: TextAreaProps<TFieldValues, TFieldName>) => {
    const { name, required } = props

    const input = useSignal<string>()
    useTask$(({ track }) => {
      input.value = track(() => value)
    })

    return (
      <div class={[error ? 'mb-3' : 'mb-6', props.class]}>
        <InputLabel name={name} label={label} required={required} />
        <textarea
          {...props}
          class={[
            'block w-full border rounded py-3 px-4 text-sm',
            error ? 'border-2 border-red-600' : 'border-gray-700',
            props.class,
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
