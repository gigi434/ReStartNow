import * as React from 'react'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'

/** 著作権を保持していることを明記する文字列
 * @param none
 * @return JSX.Element
 */
export function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://mui.com/">
        RestartNow
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}
