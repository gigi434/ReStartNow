import React, { useState } from 'react'
import { Grid, Stack } from '@mui/material'
import { BasicPagination, Card } from '@/src/components'

interface CardData {
  image: string
  title: string
  description?: string
}

interface RegionCardListProps {
  cards: CardData[]
}

export function RegionCardList({ cards }: RegionCardListProps) {
  const [page, setPage] = useState(1)
  const cardsPerPage = 8
  const totalCards = cards.length
  const totalPages = Math.ceil(totalCards / cardsPerPage)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  const renderCards = () => {
    const startIndex = (page - 1) * cardsPerPage
    const endIndex = startIndex + cardsPerPage

    return cards.slice(startIndex, endIndex).map((card) => (
      <Grid item key={card.title} xs={6} sm={6} md={3}>
        <Card
          image={card.image}
          title={card.title}
          description={card.description}
        />
      </Grid>
    ))
  }

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{ flexGrow: 1 }}
      width={'100%'}
    >
      {/* 市町区村のカード一覧 */}
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {renderCards()}
      </Grid>
      {/* 都道府県しか検索条件に記載していない場合の市町区村ページャー */}
      <Grid item xs={12} container justifyContent="flex-end">
        <BasicPagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Grid>
    </Grid>
  )
}
