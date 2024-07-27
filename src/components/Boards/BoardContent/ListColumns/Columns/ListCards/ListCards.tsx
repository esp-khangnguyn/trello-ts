'use client'

import { Box } from '@mui/material'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CardProps } from '@/interfaces/cardInterface'

function ListCards({ cards }: { cards: CardProps[] }) {
  return (
    <SortableContext items={cards?.map((c: CardProps) => c._id)} strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: '0 5px 5px 5px',
          m: '0 5px',
          overflowX: 'hidden',
          overflowY: 'scroll',
          maxHeight: (theme) =>
            `calc(60px - 
            ${theme.spacing(5)} - 50px - 56px)`,
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ced0da',
            borderRadius: '8px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bfc2cf',
            borderRadius: '8px'
          }
        }}
      >
        {cards?.map((card) => (
          <Card key={card?._id} card={card} />
        ))}
      </Box>
    </SortableContext>
  )
}

export default ListCards
