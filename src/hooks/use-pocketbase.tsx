import Pocketbase from 'pocketbase'
import { noSerialize } from '@builder.io/qwik'

function usePocketbase() {
  const pocketbase = new Pocketbase(import.meta.env.VITE_API_URL)
  noSerialize(pocketbase)
  return pocketbase
}

export default usePocketbase
