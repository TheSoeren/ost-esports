import { component$, useSignal, $ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from 'qwik-fontawesome'

interface BackButton {
  href: string
  label: string
}

export default component$(({ href, label }: BackButton) => {
  const backButtonAnimate = useSignal(false)

  return (
    <Link
      href={href}
      class="block mb-2 text-ost-pink btn-outline w-fit"
      onMouseEnter$={$(() => {
        backButtonAnimate.value = true
      })}
      onMouseLeave$={$(() => {
        backButtonAnimate.value = false
      })}
    >
      <FaIcon
        icon={faAnglesLeft}
        class="mr-1"
        fade={backButtonAnimate.value}
        fixedWidth
      />
      {label}
    </Link>
  )
})
