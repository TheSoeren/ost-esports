import { component$, useStylesScoped$ } from '@builder.io/qwik'

export default component$(() => {
  useStylesScoped$(`
  .loading-bar::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    animation: loading 3s linear infinite;
    background: linear-gradient(
      90deg,
      var(--color-ost-pink) 32%,
      var(--color-ost-purple) 32%,
      var(--color-ost-purple) 64%,
      var(--color-ost-black) 64%,
      var(--color-ost-black) 100%
    );
  }
  
  @keyframes loading {
    0% {
        background-position: 0% 100%;
        background-size: 200%;
    }

    25% {
        background-size: 132%;
    }

    50% {
        background-position: 100% 0%;
        background-size: 75%;
    }

    75% {
        background-size: 132%;
    }

    100% {
        background-position: 0% 100%;
        background-size: 200%;
    }
  }
  `)
  return <div class="loading-bar"></div>
})
