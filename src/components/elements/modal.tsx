import { Slot, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'

interface ModalProps {
  id: string
}

export default component$(({ id }: ModalProps) => {
  const modalRef = useSignal<HTMLElement>()

  useVisibleTask$(() => () => {
    if (!modalRef.value) return
    window.HSOverlay.close(modalRef.value)
  })

  return (
    <div
      id={id}
      ref={modalRef}
      class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
    >
      <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-xl sm:w-full m-3 sm:mx-auto">
        <div class="flex flex-col bg-white border shadow-sm rounded dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <Slot />
        </div>
      </div>
    </div>
  )
})
