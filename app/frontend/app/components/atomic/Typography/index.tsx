import * as React from 'react'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles'
import { Typography as MuiTypography } from '@mui/material'
import { TypographyProps as MuiTypographyProps } from '@mui/material/Typography'

let theme = createTheme()
theme = responsiveFontSizes(theme)

export default function Typography({ variant, content }: MuiTypographyProps) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <MuiTypography variant={variant}>{content}</MuiTypography>
      </ThemeProvider>
    </div>
  )
}
