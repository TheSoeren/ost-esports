import { component$ } from '@builder.io/qwik'

interface InputLabelProps {
  name: string
  label?: string
  required?: boolean
}

export default component$(({ name, label, required }: InputLabelProps) => (
  <>
    {label && (
      <label class={['inline-block text-sm font-bold mb-1']} for={name}>
        {label}
        {required && <span class="ml-1 text-red-600">*</span>}
      </label>
    )}
  </>
))
