interface BaseModel {
  id: string
  created: string
  updated: string
}

export interface Record extends BaseModel {
  collectionId: string
  collectionName: string
  expand: {
    [key: string]: Record | Record[]
  }
}

export enum Collection {
  USERS = 'users',
  TEAMS = 'teams',
  NEWS = 'news',
  GALLERIES = 'galleries',
  GALLERY_IMAGES = 'gallery_images',
  GAMES = 'games',
}
