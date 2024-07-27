import { CardDataInterface } from '@/interfaces/cardDataInterface'

export interface ColumnProps {
  _id: string
  title: string
  boardId: string
  cards: CardDataInterface[]
  columns: any[]
  cardIds: string[]
  cardOrderIds: string[]
  createdAt: number
  updatedAt: number
  _destroy?: boolean
}
