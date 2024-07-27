import { ColumnProps } from '@/interfaces/columnInterface'

export interface Board {
  _id: string
  title: string
  description: string
  type: string
  slug: string
  columnOrderIds: string[]
  createdAt: number
  updatedAt: number
  _destroy: boolean
  columns: ColumnProps
}
