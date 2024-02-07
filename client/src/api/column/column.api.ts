import type { ETableType, IColumn } from '@/api/column/column.types'
import { axiosInstance } from '@/api/axios-instance'

export const column = {
  async getColumnsByType(tableType: ETableType): Promise<IColumn[]> {
    return axiosInstance
      .get('/column/by-type', { params: { type: tableType } })
      .then(response => response.data)
  },
}
