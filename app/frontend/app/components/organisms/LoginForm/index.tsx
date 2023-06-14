import {
  Stack,
  TextField,
  Button,
  Box,
  Grid,
  Link,
  Snackbar,
  Alert,
} from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import React from 'react'
import { useSnackbar } from '../../../../hooks/useSnackbar'
import axios from 'axios'
type Inputs = {
  mailAddress: string
  password: string
}

/**
 * ログインフォーム
 */
export function LoginForm() {
  const { snackbar, openSnackbar, closeSnackbar } = useSnackbar()
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      mailAddress: '',
      password: '',
    },
  })

  const watchAll = watch()

  const validationRules = {
    mailAddress: {
      required: 'メールアドレスを入力してください',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: '正しいメールアドレスを入力してください',
      },
    },
    password: {
      required: 'パスワードを入力してください',
    },
  }

  /**
   * ログインフォームのボタンを押された時のコールバック関数
   */
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs, e) => {
    e?.preventDefault()

    try {
      await axios.post('/login', {
        email: data.mailAddress,
        password: data.password,
      })
    } catch (error) {
      openSnackbar(
        'ログインに失敗しました。メールアドレスかパスワードどちらかが間違えています。'
      )
    }
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stack
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
          sx={{ m: 2, width: '320px' }}
        >
          {/* メールアドレスのインプット */}
          <Controller
            name="mailAddress"
            control={control}
            rules={validationRules.mailAddress}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                label="メールアドレス"
                variant="standard"
                error={errors.mailAddress !== undefined}
                helperText={errors.mailAddress?.message}
              />
            )}
          />
          {/* パスワードのインプット */}
          <Controller
            name="password"
            control={control}
            rules={validationRules.password}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="パスワード"
                variant="standard"
                error={errors.password !== undefined}
                helperText={errors.password?.message}
              />
            )}
          />
          {/* パスワードを忘れたときのリンクテキスト */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                variant="body2"
                href="/forgot-password"
                underline="none"
                color="inherit"
              >
                パスワードを忘れましたか？
              </Link>
            </Grid>
          </Grid>
          {/* ログインボタン */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={
              Object.keys(errors).length !== 0 ||
              !watchAll.mailAddress ||
              !watchAll.password
            }
          >
            ログイン
          </Button>
          {/* アカウント新規作成ボタン */}
          <Grid container justifyContent="center">
            <Grid item>
              <Link
                variant="body2"
                href="/register"
                underline="none"
                color="inherit"
              >
                アカウントを持っていませんか？登録
              </Link>
            </Grid>
          </Grid>
        </Stack>
      </Box>

      {/* ログインが失敗した際に表示されるスナックバー */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
