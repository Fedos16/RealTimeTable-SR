import { defineStore } from 'pinia'
import type { AnyObject, ITableStoreState } from '@/stores/table/table.types'
import type { IUser } from '@/api/user'
import type { IColumn } from '@/api/column'

export const useTableStore = defineStore<ITableStoreState>('table', {
  state: (): ITableStoreState => ({
    data: [],
    columns: [],
  }),
  actions: {
    setData(users: IUser[]) {
      this.data = users
    },
    setColumns(columns: IColumn[]) {
      this.columns = columns
    },
    addRow(row: AnyObject) {
      this.data.push(row)
    },
    removeRow(rowId: AnyObject['_id']) {
      this.data = this.data.filter(item => item._id !== rowId)
    },
    editRow(row: AnyObject) {
      this.data = this.data.map(item => (item._id === row._id ? row : item))
    },
    addColumn(column: IColumn) {
      this.columns.push(column)
    },
    removeColumn(columnId: string) {
      this.columns = this.columns.filter(column => column._id !== columnId)
    },
    editColumn(editedColumn: IColumn) {
      this.columns = this.columns.map(column =>
        column._id === editedColumn._id ? editedColumn : column,
      )
    },
  },
})
