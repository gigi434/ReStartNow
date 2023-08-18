import React from 'react'
import MuiCard from '@mui/material/Card'
import MuiCardContent from '@mui/material/CardContent'
import MuiCardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea as MuiCardActionArea } from '@mui/material'

export interface CardProps {
  /** カードの画像のURL */
  image: string

  /** カードのタイトル */
  title: string

  /** カードの説明*/
  description?: string

  /** カードがクリック可能かどうか */
  clickable?: boolean

  /** カードのドロップシャドウを無くすかどうか */
  variant?: 'outlined' | undefined
}

export function Card({
  image,
  title,
  description,
  clickable = false,
  variant = undefined,
}: CardProps) {
  const content = (
    <>
      <MuiCardMedia component="img" height="140" image={image} alt={title} />
      <MuiCardContent>
        <Typography gutterBottom variant="body1">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </MuiCardContent>
    </>
  )

  return (
    <MuiCard sx={{ maxWidth: 345 }} variant={variant}>
      {clickable ? <MuiCardActionArea>{content}</MuiCardActionArea> : content}
    </MuiCard>
  )
}
