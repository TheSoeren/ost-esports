import { $, component$, useStylesScoped$ } from '@builder.io/qwik'
import { FaIcon } from 'qwik-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import styles from '~/css/elements/pagination.css?inline'
import type { ListResult } from 'pocketbase'
import { useLocation, useNavigate } from '@builder.io/qwik-city'

export default component$((listResult: ListResult<unknown>) => {
  useStylesScoped$(styles)

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
    if (listResult.page < listResult.totalPages) {
      queryParams.set('page', String(listResult.page + 1))
      updatePagination$()
    }
  })

  const previousPage$ = $(() => {
    if (listResult.page > 1) {
      queryParams.set('page', String(listResult.page - 1))
      updatePagination$()
    }
  })

  const paginationArray = Array.from(
    { length: listResult.totalPages },
    (_, i) => i + 1
  )

  if (paginationArray.length < 2) {
    return null
  }

  return (
    <section>
      <button
        class="btn-outline pagination-button__left"
        disabled={listResult.page === 1}
        onClick$={previousPage$}
      >
        <FaIcon icon={faAngleLeft} class="mr-1" fixedWidth />
      </button>
      {paginationArray.map((pageNr) => (
        <button
          key={pageNr}
          class={[
            'btn-outline pagination-button__pages',
            listResult.page === pageNr && 'btn-outline--highlight',
          ]}
          onClick$={() => setPage$(pageNr)}
        >
          {pageNr}
        </button>
      ))}
      <button
        class="btn-outline pagination-button__right"
        disabled={listResult.page === listResult.totalPages}
        onClick$={nextPage$}
      >
        <FaIcon icon={faAngleRight} class="mr-1" fixedWidth />
      </button>
    </section>
  )
})
