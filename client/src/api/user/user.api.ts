import type { IUser } from '@/api/user'
import { axiosInstance } from '@/api/axios-instance'

export const user = {
  async getUsers(): Promise<IUser[]> {
    return axiosInstance.get<IUser[]>('/user').then(response => response.data)
  },
}
