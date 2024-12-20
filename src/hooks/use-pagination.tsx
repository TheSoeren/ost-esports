import { $ } from '@builder.io/qwik'
import { useLocation, useNavigate } from '@builder.io/qwik-city'
import type { ListResult } from 'pocketbase'

export interface PaginationReturn {
  setPage$(pageNr: number): void
  nextPage$(): void
  previousPage$(): void
}

function usePagination({ page, totalPages }: ListResult<unknown>) {
  const navigate = useNavigate()
  const { url } = useLocation()
  const queryParams = new URLSearchParams(url.search)

  const updatePagination$ = $(() => {
    navigate('?' + queryParams.toString(), { replaceState: true })
  })

  const setPage$ = $((pageNr: number) => {
    queryParams.set('page', String(pageNr))
    updatePagination$()
  })

  const nextPage$ = $(() => {
    if (page < totalPages) {
      queryParams.set('page', String(page + 1))
      updatePagination$()
    }
  })

  const previousPage$ = $(() => {
    if (page > 1) {
      queryParams.set('page', String(page - 1))
      updatePagination$()
    }
  })

  return {
    setPage$,
    nextPage$,
    previousPage$,
  }
}

export default usePagination
