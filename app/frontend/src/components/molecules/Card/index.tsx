import React from 'react'
import MuiCard from '@mui/material/Card'
import MuiCardContent from '@mui/material/CardContent'
import MuiCardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea as MuiCardActionArea } from '@mui/material'

export interface CardProps {
  /**
   * カードの画像のURL
   */
  image: string

  /**
   * カードのタイトル
   */
  title: string

  /**
   * カードの説明
   */
  description?: string
}

export function Card({ image, title, description }: CardProps) {
  return (
    <MuiCard sx={{ maxWidth: 345 }}>
      <MuiCardActionArea>
        <MuiCardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
          style={{ objectFit: 'contain' }}
        />
        <MuiCardContent>
          <Typography gutterBottom variant="body1">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </MuiCardContent>
      </MuiCardActionArea>
    </MuiCard>
  )
}
