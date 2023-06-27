import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { BasicPagination, Card } from '@/src/components'

interface CardData {
  image: string
  title: string
  description: string
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

    return cards.slice(startIndex, endIndex).map((card, index) => (
      <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
        <Card
          image={card.image}
          title={card.title}
          description={card.description}
        />
      </Grid>
    ))
  }

  return (
    <div>
      {/* 市町区村のカード一覧 */}
      <Grid container spacing={2}>
        {renderCards()}
      </Grid>
      {/* 都道府県しか検索条件に記載していない場合の市町区村ページャー */}
      <BasicPagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  )
}
