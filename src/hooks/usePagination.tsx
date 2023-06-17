import type { QRL, Signal } from '@builder.io/qwik'
import { $, useSignal } from '@builder.io/qwik'

export interface PaginationReturn {
  page: Signal<number>
  perPage: Signal<number>
  totalPages: Signal<number>
  nextPage: QRL<() => void>
  previousPage: QRL<() => void>
}

function usePagination(page: number, perPage: number) {
  const pageSig = useSignal(page)
  const perPageSig = useSignal(perPage)
  const totalPages = useSignal(0)

  const setPage = $((pageNr: number) => {
    pageSig.value = pageNr
  })

  const nextPage = $(() => {
    if (pageSig.value < totalPages.value) {
      pageSig.value++
    }
  })

  const previousPage = $(() => {
    if (pageSig.value > 1) {
      pageSig.value--
    }
  })

  const setTotalPages = $((pages: number) => {
    totalPages.value = pages
  })

  return {
    page: pageSig,
    perPage: perPageSig,
    totalPages: totalPages,
    setTotalPages,
    setPage,
    nextPage,
    previousPage,
  }
}

export default usePagination
