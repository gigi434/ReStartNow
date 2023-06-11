import {
  Container,
  Stack,
  Grid,
  Typography,
  Button,
  TextField,
  Link,
} from '@mui/material'
import { Divider } from '@/components'
import * as React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

const sampleEmail = 'sample@example.com'

// フォームで扱うデータ型を定義します。
type Inputs = {
  currentEmail: string
  currentPassword: string
  newPassword: string
}

export function PasswordChange() {
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
      required: '現在のメールアドレスを入力してください',
      pattern: {
        value:
          /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
        message: '正しいメールアドレスを入力してください',
      },
      varidate: (value: string | null) =>
        value === sampleEmail || '現在のメールアドレスが正しくありません',
    },
    currentPassword: {
      required: '現在のパスワードを入力してください',
    },
    newPassword: {
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
  }

  return (
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
          <Stack sx={{ m: 2, width: '320px' }}>
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              rules={validationRules.newPassword}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="新しいパスワード"
                  variant="standard"
                  error={errors.newPassword !== undefined}
                  helperText={errors.newPassword?.message}
                />
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
                  !watchAll.currentEmail ||
                  !watchAll.currentPassword ||
                  !watchAll.newPassword
                }
              >
                確認画面へ移動する
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </section>
  )
}
