import { Container, Stack, Grid, Button, TextField } from '@mui/material'
import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

// フォームで扱うデータ型を定義します。
type Inputs = {
  currentEmail: string
}

/**
 * パスワードを忘れた場合のメールアドレス入力フォーム
 */
export function ReceiveResetEmailForm() {
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
    currentEmail: {
      required: '新しいメールアドレスを入力してください',
      pattern: {
        value:
          /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
        message: '正しいメールアドレスを入力してください',
      },
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
          <Controller
            name="currentEmail"
            control={control}
            rules={validationRules.currentEmail}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                variant="standard"
                error={errors.currentEmail !== undefined}
                helperText={errors.currentEmail?.message}
                label="現在のメールアドレス"
              />
            )}
          />
          {/* 新しいメールアドレスへリンク付きのメールを送信するボタン */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  Object.keys(errors).length !== 0 || !watchAll.currentEmail
                }
              >
                リセット用メールを受け取る
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </section>
  )
}
