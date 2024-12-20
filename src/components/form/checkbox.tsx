import { component$ } from '@builder.io/qwik'
import InputError from './input-error'
import type {
  FieldElementProps,
  FieldPath,
  FieldValues,
} from '@modular-forms/qwik'

interface CheckboxProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> extends FieldElementProps<TFieldValues, TFieldName> {
  value?: string
  checked?: boolean
  required?: boolean
  class?: string
  label: string
  error?: string
}

export default component$(
  <
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues>,
  >({
    label,
    error,
    class: className,
    ...props
  }: CheckboxProps<TFieldValues, TFieldName>) => {
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
