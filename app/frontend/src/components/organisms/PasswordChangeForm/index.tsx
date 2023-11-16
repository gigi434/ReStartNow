import {
  Container,
  Stack,
  Grid,
  Typography,
  Button,
  TextField,
  Link,
  Snackbar,
  Alert,
} from '@mui/material'
import { Divider, PasswordChangeValidationTexts } from '@/src/components'
import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useSnackbar, usePasswordValidation } from '@/src/hooks'
import axios from 'axios'

// フォームで扱うデータ型を定義します。
type Inputs = {
  currentMailAddress: string
  currentPassword: string
  newPassword: string
}

export function PasswordChangeForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>()
  const watchAll = watch()
  const { snackbar, openSnackbar, closeSnackbar } = useSnackbar()
  const { isValid, validationResults } = usePasswordValidation(
    watchAll.newPassword
  )

  const validationRules = {
    currentMailAddress: {
      required: '現在のメールアドレスを入力してください',
      pattern: {
        value:
          /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
        message: '正しいメールアドレスを入力してください',
      },
    },
    currentPassword: {
      required: '現在のパスワードを入力してください',
    },
    // newPasswordはUIとして別に検証結果を表示するためReactHooKFormの検証は使用しない
  }

  /**
   * パスワード変更フォームのボタンを押された時のコールバック関数
   */
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs, e) => {
    const { currentMailAddress, currentPassword, newPassword } = data
    e?.preventDefault()

    try {
      await axios.post('/profile/passwordChange', {
        currentMailAddress,
        currentPassword,
        newPassword,
      })
    } catch (error) {
      openSnackbar(
        '認証に失敗しました。メールアドレスかパスワードどちらかが間違えています。'
      )
    }
  }

  return (
    <>
      <section>
        <Container>
          <Stack
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            spacing={2}
            sx={{ m: 2, width: '632px' }}
          >
            <Typography variant="h5">パスワードの変更</Typography>

            <Divider />

            <Stack spacing={2} sx={{ m: 2, width: '320px' }}>
              <Controller
                name="currentMailAddress"
                control={control}
                rules={validationRules.currentMailAddress}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="email"
                    variant="standard"
                    error={errors.currentMailAddress !== undefined}
                    helperText={errors.currentMailAddress?.message}
                    label="現在のメールアドレス"
                  />
                )}
              />
              <Controller
                name="currentPassword"
                control={control}
                defaultValue=""
                rules={validationRules.currentPassword}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="現在のパスワード"
                    variant="standard"
                    error={errors.currentPassword !== undefined}
                    helperText={errors.currentPassword?.message}
                  />
                )}
              />
            </Stack>

            {/* パスワードを忘れた場合、メールアドレスだけ入力させる画面へ遷移するリンクテキスト */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  href="/register"
                  underline="none"
                  color="inherit"
                >
                  パスワードを忘れましたか？
                </Link>
              </Grid>
            </Grid>

            {/* 新しいパスワードを入力するインプット */}
            <Stack spacing={2} sx={{ m: 2 }}>
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Stack spacing={2} sx={{ width: '320px' }}>
                      <TextField
                        {...field}
                        type="password"
                        label="新しいパスワード"
                        variant="standard"
                        error={errors.newPassword !== undefined}
                        helperText={errors.newPassword?.message}
                        onChange={(e) => {
                          field.onChange(e) // react-hook-forms に変更を伝える
                        }}
                      />
                    </Stack>

                    <Stack spacing={1}>
                      <PasswordChangeValidationTexts
                        validationResults={validationResults}
                      />
                    </Stack>
                  </>
                )}
              />
            </Stack>

            {/* アカウントのパスワードを変更してくよいか確認する画面へ遷移するボタン */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    Object.keys(errors).length !== 0 ||
                    !watchAll.currentMailAddress ||
                    !watchAll.currentPassword ||
                    !watchAll.newPassword ||
                    !isValid
                  }
                >
                  確認画面へ移動する
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </section>
      {/* メールアドレスかパスワードが間違えていた際に表示されるスナックバー */}
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
