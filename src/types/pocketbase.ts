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
