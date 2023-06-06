import { Stack, TextField, Button, Typography } from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import React from 'react'

// フォームで扱うデータ型を定義します。
type Inputs = {
  /** 助成金の名前 */
  name: string | null
  /** 申請先 */
  applicationAddress: string | null
  /** 年齢制限 */
  ageLimit: string
  /** 受給額 */
  amountReceived: number
  /** 受給期限 */
  deadlineForReceipt: number
}

/** 助成金の検索フォーム */
export function SubsidySearchForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  // フォームが送信されたときの処理を定義します。
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(`submit: `, data)
  }

  return (
    <section>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{ m: 2, width: '25ch' }}
      >
        {/* フォームの見出し */}
        <Typography variant="h6" component="h2">
          助成金検索
        </Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="名前"
              variant="standard"
              error={errors.name !== undefined}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="applicationAddress"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="申請先"
              variant="standard"
              error={errors.applicationAddress !== undefined}
              helperText={errors.applicationAddress?.message}
            />
          )}
        />
        <Controller
          name="ageLimit"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="年齢制限"
              variant="standard"
              error={errors.ageLimit !== undefined}
              helperText={errors.ageLimit?.message}
            />
          )}
        />
        <Controller
          name="amountReceived"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="受給額"
              variant="standard"
              error={errors.amountReceived !== undefined}
              helperText={errors.amountReceived?.message}
            />
          )}
        />
        <Controller
          name="deadlineForReceipt"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="受給期限"
              variant="standard"
              error={errors.deadlineForReceipt !== undefined}
              helperText={errors.deadlineForReceipt?.message}
            />
          )}
        />
        <Button variant="contained" type="submit" color="primary">
          検索
        </Button>
      </Stack>
    </section>
  )
}
