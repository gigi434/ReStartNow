import { useState } from 'react'
import * as React from 'react'
import { Button, Container, Stack, Typography } from '@mui/material'

export function SignupConfirmation() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleCreateAccount = () => {
    // ここでアカウントの作成処理を実行する

    // 例えば、以下のようにコンソールに出力するだけとします
    console.log('Creating account with email:', email)
    console.log('Creating account with password:', password)
  }

  return (
    <Container>
      <Stack spacing={2} sx={{ m: 2, width: '320px' }}>
        <Typography variant="body1">メールアドレス</Typography>
        <Typography>{email}</Typography>

        <Typography variant="body1">パスワード</Typography>
        <Typography>{'*'.repeat(8)}</Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateAccount}
        >
          アカウントを作成する
        </Button>
      </Stack>
    </Container>
  )
}
