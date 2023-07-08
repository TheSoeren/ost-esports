import { noSerialize } from '@builder.io/qwik'
import Pocketbase from 'pocketbase'

function usePocketbase() {
  const pocketbase = new Pocketbase(import.meta.env.VITE_API_URL)
  noSerialize(pocketbase)
  return pocketbase
}

export default usePocketbase
