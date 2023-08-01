import type { Record } from './pocketbase'

export interface Gallery extends Record {
  name: string
  coverImage: string
  images: string[]
  creator: string
  hidden: boolean
}

export interface GalleryImage extends Record {
  image: string
  gallery: Gallery
}
