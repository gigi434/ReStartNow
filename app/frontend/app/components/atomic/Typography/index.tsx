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

// component属性はTypographyProps自体に存在せず、引数として設定するとエラーが発生するためinterfaceを定義して対処する
interface TypographyProps extends MuiTypographyProps {
  component?: React.ElementType
}

export default function Typography({
  variant,
  component = 'span',
  children,
}: TypographyProps) {
  return (
    <ThemeProvider theme={theme}>
      <MuiTypography variant={variant} component={component}>
        {children}
      </MuiTypography>
    </ThemeProvider>
  )
}
