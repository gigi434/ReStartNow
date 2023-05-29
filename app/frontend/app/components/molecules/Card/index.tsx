import * as React from 'react'
import MuiCard from '@mui/material/Card'
import MuiCardContent from '@mui/material/CardContent'
import Image from 'next/image'

interface CardProps {
  cardImage: string
  cardImageAlt: string
  cardContent: React.ReactNode
}

export default function Card({
  cardImage,
  cardImageAlt,
  cardContent,
}: CardProps) {
  return (
    <MuiCard sx={{ maxWidth: 345 }}>
      <Image
        src={cardImage}
        alt={cardImageAlt}
        width={345}
        height={140}
        style={{ objectFit: 'contain' }}
      />
      <MuiCardContent sx={{ height: 140 }}>{cardContent}</MuiCardContent>
    </MuiCard>
  )
}
