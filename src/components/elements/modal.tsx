import { Slot, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'

interface ModalProps {
  id: string
}

export default component$(({ id }: ModalProps) => {
  const modalRef = useSignal<HTMLElement>()

  // Use visibleTask until qwik offers a better api (useUnMount$ -> https://qwik.dev/tutorial/hooks/use-un-mount/)
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    window.HSStaticMethods.autoInit()

    return () => {
      if (modalRef.value) {
        window.HSOverlay.close(modalRef.value)
      }
    }
  })

  return (
    <div
      id={id}
      ref={modalRef}
      class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto pointer-events-none"
    >
      <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-xl sm:w-full m-3 sm:mx-auto">
        <div class="flex flex-col border shadow-sm rounded bg-gray-800 border-gray-700 shadow-slate-700/[.7] hs-overlay-content pointer-events-auto">
          <Slot />
        </div>
      </div>
    </div>
  )
})
