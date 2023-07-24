import { component$ } from '@builder.io/qwik'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from 'qwik-fontawesome'

export default component$(() => {
  return (
    <div class="absolute inset-0 bg-ost-black/50 flex justify-center items-center">
      <FaIcon icon={faCircleNotch} class="text-white text-7xl" spin />
    </div>
  )
})
