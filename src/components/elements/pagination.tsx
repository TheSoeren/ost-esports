import {
  component$,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik'
import { FaIcon } from 'qwik-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import styles from '~/css/elements/pagination.css?inline'
import type { PaginationReturn } from '~/hooks/usePagination'

export default component$((pagination: PaginationReturn) => {
  useStylesScoped$(styles)

  // Redundant state, because total pages wouldn't correctly update on first render
  const paginationArray = useSignal<number[]>([])
  useVisibleTask$(({ track }) => {
    track(() => pagination.totalPages.value)
    paginationArray.value = Array.from(
      { length: pagination.totalPages.value },
      (_, i) => i + 1
    )
  })

  if (paginationArray.value.length < 2) {
    return null
  }

  return (
    <section>
      <button
        class="btn-outline pagination-button__left"
        disabled={pagination.page.value === 1}
        onClick$={pagination.previousPage$}
      >
        <FaIcon icon={faAngleLeft} class="mr-1" fixedWidth />
      </button>
      {paginationArray.value.map((pageNr) => (
        <button
          key={pageNr}
          class={[
            'btn-outline pagination-button__pages',
            pagination.page.value === pageNr && 'btn-outline--highlight',
          ]}
          onClick$={() => pagination.setPage$(pageNr)}
        >
          {pageNr}
        </button>
      ))}
      <button
        class="btn-outline pagination-button__right"
        disabled={pagination.page.value === pagination.totalPages.value}
        onClick$={pagination.nextPage$}
      >
        <FaIcon icon={faAngleRight} class="mr-1" fixedWidth />
      </button>
    </section>
  )
})
