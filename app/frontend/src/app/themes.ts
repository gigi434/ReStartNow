import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material'
import { blueGrey, cyan, pink, red, indigo } from '@mui/material/colors'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: indigo.A400,
      light: indigo.A100,
    },
    secondary: {
      main: cyan.A400,
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: pink['A200'],
    },
    secondary: {
      main: cyan['A400'],
    },
    background: {
      default: blueGrey['800'],
      paper: blueGrey['700'],
    },
  },
})
