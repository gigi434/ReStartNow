import { Container, Stack, Grid, Button, TextField } from '@mui/material'
import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

// フォームで扱うデータ型を定義します。
type Inputs = {
  password: string
  passwordConfirmation: string
}

/**
 * パスワードを忘れた場合のパスワード変更フォーム
 */
export function ResetPasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    // フォームの送信処理をここに実装する
    console.log(data)
  }

  const watchAll = watch()

  const validationRules = {
    password: {
      required: '新しいパスワードを入力してください',
      minLength: {
        value: 8,
        message: 'パスワードは8文字以上で入力してください',
      },
      validate: (value: string) => {
        if (!/(?=.*[a-z])/.test(value)) {
          return 'パスワードは小文字アルファベットを含めてください'
        }
        if (!/(?=.*[A-Z])/.test(value)) {
          return 'パスワードは大文字アルファベットを含めてください'
        }
        if (!/(?=.*[0-9])/.test(value)) {
          return 'パスワードは数字を含めてください'
        }
      },
    },
    passwordConfirmation: {
      required: 'パスワードを入力してください',
      validate: (value: string | null) =>
        value === watch('password') || 'パスワードが一致しません',
    },
  }

  return (
    <section>
      <Container>
        <Stack
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
          sx={{ m: 2, width: '320px' }}
        >
          <Stack spacing={2} sx={{ m: 2, width: '320px' }}>
            <Controller
              name="password"
              control={control}
              rules={validationRules.password}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  variant="standard"
                  error={errors.password !== undefined}
                  helperText={errors.password?.message}
                  label="新しいパスワード"
                />
              )}
            />
          </Stack>
          <Stack spacing={2} sx={{ m: 2, width: '320px' }}>
            <Controller
              name="passwordConfirmation"
              control={control}
              rules={validationRules.passwordConfirmation}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  variant="standard"
                  error={errors.passwordConfirmation !== undefined}
                  helperText={errors.passwordConfirmation?.message}
                  label="確認用新しいパスワード"
                />
              )}
            />
          </Stack>
          {/* 新しいメールアドレスへリンク付きのメールを送信するボタン */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  Object.keys(errors).length !== 0 ||
                  !watchAll.password ||
                  !watchAll.passwordConfirmation
                }
              >
                パスワードをリセットする
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </section>
  )
}
