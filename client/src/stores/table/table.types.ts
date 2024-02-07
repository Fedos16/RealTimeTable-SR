import type { IColumn } from '@/api/column'

export interface AnyObject {
  _id: string
  [key: string]: any
}

export interface ITableStoreState {
  data: AnyObject[]
  columns: IColumn[]
}
