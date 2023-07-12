import { component$ } from '@builder.io/qwik'
import type { TextInputProps } from '~/types/form'

export default component$(
  ({ label, error, name, ...props }: TextInputProps) => {
    return (
      <div class={[error ? 'mb-3' : 'mb-6']}>
        {label && (
          <label for={name} class="block text-sm font-bold mb-1">
            {label}
          </label>
        )}

        <div class="relative">
          <input
            {...props}
            id={name}
            aria-invalid={!!error}
            aria-errormessage={`${name}-error`}
            class={[
              'block w-full border rounded-md py-3 px-4 text-sm',
              error ? 'border-2 border-red-600' : 'border-gray-700',
            ]}
          />
          {error && (
            <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
              <svg
                class="h-5 w-5 text-red-500"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
            </div>
          )}
        </div>
        {error && <p class="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    )
  }
)
