import React from 'react'
import MuiCard from '@mui/material/Card'
import MuiCardContent from '@mui/material/CardContent'
import MuiCardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

export interface MediaCardProps {
  /**
   * カードの画像のURL
   */
  image: string

  /**
   * カードのタイトル
   */
  title?: string

  /**
   * カードの説明
   */
  description?: string
}

export function MediaCard({ image, title, description }: MediaCardProps) {
  return (
    <MuiCard sx={{ maxWidth: 345 }}>
      <MuiCardMedia component="img" height="140" image={image} alt={title} />
      <MuiCardContent>
        <Typography gutterBottom variant="body1">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </MuiCardContent>
    </MuiCard>
  )
}
