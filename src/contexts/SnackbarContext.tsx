import {
  $,
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
  useTask$,
} from '@builder.io/qwik'
import Snackbar from '~/components/elements/snackbar'
import { v4 as uuid } from 'uuid'

export type SnackbarType = 'success' | 'info' | 'warn' | 'error'

export interface Snackbar {
  type: SnackbarType
  title: string
  message?: string
  duration: number
}

interface FullSnackbar extends Snackbar {
  id: string
  deleted: boolean
}

interface SnackbarContext {
  enqueueSnackbar(snackbar: Snackbar): void
  queue: Snackbar[]
}

export const SnackbarContext =
  createContextId<SnackbarContext>('snackbar-context')

export const SnackbarProvider = component$(() => {
  const queue = useStore<FullSnackbar[]>([])

  const enqueueSnackbar = $((snackbar: Snackbar) => {
    queue.push({ id: uuid(), ...snackbar, deleted: false })
  })

  const dequeueSnackbar = $((id: string) => {
    const index = queue.findIndex((snackbar) => snackbar.id === id)
    if (index !== -1) {
      queue.splice(index, 1)
    }
  })

  useTask$(({ track }) => {
    track(() => queue.length)

    queue
      .filter((snackbar) => !snackbar.deleted)
      .forEach((snackbar) => {
        snackbar.deleted = true
        const timeoutId = setTimeout(() => {
          dequeueSnackbar(snackbar.id)
        }, snackbar.duration)

        return () => clearTimeout(timeoutId)
      })
  })

  useContextProvider(SnackbarContext, { enqueueSnackbar, queue })

  return (
    <>
      <section class="absolute right-3 top-3 z-50 max-w-sm">
        {queue.map((snackbar) => (
          <Snackbar
            key={snackbar.id}
            snackbar={snackbar}
            onClick$={() => dequeueSnackbar(snackbar.id)}
          />
        ))}
      </section>
      <Slot />
    </>
  )
})
