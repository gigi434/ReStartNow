import {
  Stack,
  TextField,
  Button,
  Container,
  Grid,
  Link,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import React from 'react'

// フォームで扱うデータ型を定義します。
type Inputs = {
  mailAddress: string | null
  password: string | null
  passwordConfirmation: string | null
  agreeTerms: boolean
}

/**
 *  サインアップフォーム
 */
export function SignupForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>()

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
      minLength: {
        value: 8,
        message: 'パスワードは少なくとも8文字以上で入力してください',
      },
    },
    passwordConfirmation: {
      required: 'パスワードを入力してください',
      validate: (value: string | null) =>
        value === watch('password') || 'パスワードが一致しません',
    },
    agreeTerms: {
      required: '利用規約とプライバシーポリシーへの同意が必要です',
    },
  }

  // フォームが送信されたときの処理を定義します。
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(`submit: `, data)
  }

  return (
    <Container>
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
        {/* パスワードの確認インプット */}
        <Controller
          name="passwordConfirmation"
          control={control}
          rules={validationRules.passwordConfirmation}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="パスワードの確認"
              variant="standard"
              error={errors.passwordConfirmation !== undefined}
              helperText={errors.passwordConfirmation?.message}
            />
          )}
        />
        {/* 利用規約とプライバシーポリシーへの同意を求めるチェックボックス */}
        <Controller
          name="agreeTerms"
          control={control}
          rules={validationRules.agreeTerms}
          render={({ field }) => (
            <FormControlLabel
              {...field}
              control={<Checkbox size="small" />}
              label="利用規約とプライバシーポリシーに同意する"
              componentsProps={{ typography: { variant: 'body2' } }}
            />
          )}
        />
        {/* 利用規約とプライバシーポリシーへ遷移するリンクテキスト */}
        <Grid container>
          <Grid item>
            <Link
              variant="body2"
              href="/terms"
              underline="none"
              color="inherit"
            >
              利用規約
            </Link>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Link
              variant="body2"
              href="/privacy-policy"
              underline="none"
              color="inherit"
            >
              プライバシーポリシー
            </Link>
          </Grid>
        </Grid>

        {/* アカウント新規作成の情報入力後に確認画面へ遷移するボタン */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          // インプット要素にエラーが出ていないかつすべて入力済みである場合ボタンが活性化される
          disabled={
            Object.keys(errors).length !== 0 ||
            !watchAll.mailAddress ||
            !watchAll.password ||
            !watchAll.passwordConfirmation ||
            !watchAll.agreeTerms
          }
        >
          確認画面へ遷移する
        </Button>

        {/* アカウントをお持ちですか？ログイン */}
        <Grid container justifyContent="center">
          <Grid item>
            <Link
              variant="body2"
              href="/login"
              underline="none"
              color="inherit"
            >
              アカウントをお持ちですか？ログイン
            </Link>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}
