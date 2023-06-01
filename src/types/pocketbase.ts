export interface Record extends BaseModel {
  collectionId: string
  collectionName: string
}

export interface ListResult<M = BaseModel> {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Array<M>
}

export interface BaseModel {
  id: string
  created: string
  updated: string
}
