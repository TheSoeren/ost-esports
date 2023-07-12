import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { faGhost } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from 'qwik-fontawesome'

export default component$(() => {
  useStylesScoped$(`
    .container {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }

    h1 {
      color: var(--color-ost-purple);
      font-size: 12.5rem;
      letter-spacing: .10em;
      margin: .025em 0;
      text-shadow: .05em .05em 0 rgba(0,0,0,.25);
      white-space: nowrap;
      
      @media(max-width: 30rem) {
        font-size: 8.5rem;
      }
    }

    h1 > span {
      animation: spooky 2s alternate infinite linear;
      color: var(--color-ost-black);
      display: inline-block;
    }

    h2 {
      color: var(--color-ost-black);
      margin-bottom: .40em;
    }

    p {
      color: #ccc;
      margin-top: 0;
    }

    @keyframes spooky {
      from {
        transform: translatey(.15em) scaley(.95);
      }
      
      to {
        transform: translatey(-.15em);
      }
    }
    `)
  return (
    <section class="container">
      <h1>
        4
        <span>
          <FaIcon icon={faGhost} />
        </span>
        4
      </h1>
      <p>Sorry, the page you're looking for cannot be accessed</p>
    </section>
  )
})
