import { holderCardInterface } from '@/interfaces/holderCardinterface'

export const capitalizeFirstLetter = (val: string) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const generatePlaceHolderCard = (column: any): holderCardInterface => {
  return {
    _id: `${column._id}-placehorder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}
