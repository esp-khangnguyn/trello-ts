import { Box, Container } from '@mui/material'
import AppBar from '@/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
// import {
//   fetchBoardDetailsAPI,
//   createNewCardAPI,
//   createNewColumnAPI,
//   updateBoardDetailsAPI,
//   updateColumnDetailsAPI,
//   moveCardToOtherColumnAPI,
//   deleteColumnDetailsAPI
// } from '@/api'
import { isEmpty } from 'lodash'
import { generatePlaceHolderCard } from '@/utils/formatters'
import { mapOrder } from '@/utils/sorts'
import { toast } from 'react-toastify'
import { ColumnProps } from '@/interfaces/columnInterface'
import {
  fetchBoardDetailsAPI,
  createNewCardAPI,
  createNewColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToOtherColumnAPI,
  deleteColumnDetailsAPI
} from '@/api'
import { CardProps } from '@/interfaces/cardInterface'

function Board() {
  const [board, setBoard] = useState<any>(null)

  useEffect(() => {
    const boardId = '669a819312719b90a5a17f2e'
    fetchBoardDetailsAPI(boardId).then((board) => {
      // Sap xep lai order cua card truoc khi truyen xuong component duuoi
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach((column: ColumnProps) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolderCard(column)]
          column.cardOrderIds = [generatePlaceHolderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (newColumnData: { boardId: string; title: string }) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceHolderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceHolderCard(createdColumn)._id]

    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData: { boardId: string; columnId: string; title: string }) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    const newBoard = { ...board }
    const columnUpdate = newBoard.columns.find((column: ColumnProps) => column._id === createdCard.columnId)

    if (columnUpdate) {
      // Xử lí việc đẩy cả thẻ fake vào column dẫn đến lỗi => loại nó ra rồi thêm
      if (columnUpdate.cards.some((card: any) => card.FE_PlaceholderCard)) {
        columnUpdate.cards = [createdCard]
        columnUpdate.cardOrderIds = []
      } else {
        columnUpdate.cards.push(createdCard)
        columnUpdate.cardOrderIds.push(createdCard._id)
      }
    }

    setBoard(newBoard)
  }

  const moveColumns = (dndOrderedColumns: ColumnProps[]) => {
    console.log('dnd: ', dndOrderedColumns)

    const dndOrderColumnIds = dndOrderedColumns.map((c) => c?._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderColumnIds
    setBoard(newBoard)

    // goi api update
    // Do là chỉ cần thực hiện update chứ không cần trả về kết quả gì để sài tiếp nên không cần phải có await/async
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderColumnIds
    })
  }

  const moveCardInTheSameColumn = (dndOrderCard: CardProps[], dndOrderCardIds: string[], columnId: string) => {
    console.log(columnId)
    const newBoard = { ...board }
    const columnUpdate = newBoard.columns.find((column: ColumnProps) => column._id === columnId)

    if (columnUpdate) {
      columnUpdate.cards = dndOrderCard
      columnUpdate.cardOrderIds = dndOrderCardIds
    }

    setBoard(newBoard)

    // Goi apu update
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderCardIds })
  }

  const moveCardToOtherColumn = (
    currentCardId: string,
    prevColumnId: string,
    nextColumnId: string,
    dndOrderColumns: ColumnProps[]
  ) => {
    const dndOrderColumnIds = dndOrderColumns.map((c) => c?._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderColumns
    newBoard.columnOrderIds = dndOrderColumnIds
    setBoard(newBoard)

    let prevColumns: any = dndOrderColumns.find((c: ColumnProps) => c._id === prevColumnId)
    let nextColumns: any = dndOrderColumns.find((c: ColumnProps) => c._id === nextColumnId)

    let prevCardOrderIds = prevColumns.cardOrderIds

    if (prevCardOrderIds[0].includes('placehorder-card')) prevCardOrderIds = []

    moveCardToOtherColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: nextColumns.cardOrderIds
    })
  }

  const deleteColumnDetails = (columnId: string) => {
    // update chuẩn dữ liệu board
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter((c: ColumnProps) => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter((_id: string) => _id !== columnId)

    setBoard(newBoard)

    // gọi api
    deleteColumnDetailsAPI(columnId).then((res) => {
      toast.success(res?.deleteResult)
      console.log('🚀 ~ deleteColumnDetailsAPI ~ res:', res)
    })
  }

  if (!board) {
    return <Box>Loading...</Box>
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToOtherColumn={moveCardToOtherColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  )
}

export default Board
