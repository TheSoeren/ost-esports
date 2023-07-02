import { Slot, component$ } from '@builder.io/qwik'

interface ModalProps {
  id: string
}

export default component$(({ id }: ModalProps) => {
  return (
    <div
      id={id}
      class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
    >
      <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-5xl sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
        <div class="flex shadow-sm rounded-xldark:shadow-slate-700/[.7]">
          <Slot />
        </div>
      </div>
    </div>
  )
})
