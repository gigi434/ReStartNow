import { Stack, TextField, Typography, Autocomplete } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import React, { useState } from 'react'
import { CustomSubsidy } from '@/src/utils'
import { useRouter } from 'next/router'

type Inputs = {
  name: string | null
}

type SubsidySearchFormProps = {
  subsidies: CustomSubsidy[]
}

export function SubsidySearchForm({ subsidies }: SubsidySearchFormProps) {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')
  const {
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: null,
    },
  })

  const onSubsidyChange = (newValue: string | null) => {
    const newQuery = { ...router.query }
    // フォームに値がないならクエリパラメータを削除する
    if (newValue === null || newValue === '') {
      delete newQuery.subsidyName
    } else {
      newQuery.subsidyName = newValue
    }
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true }
    )
  }

  // フォームに値を入力後エンターキーを押した際に呼ばれるコールバック関数
  const handleKeyDown = (
    event: React.KeyboardEvent,
    filteredOptions: string[]
  ) => {
    if (
      event.key === 'Enter' &&
      filteredOptions.length > 0 &&
      !event.defaultPrevented
    ) {
      event.preventDefault()
      // エンターキーを押したら選択肢の一番を選択する
      onSubsidyChange(filteredOptions[0])
    }
  }

  // 選択肢の中から入力された値の部分一致している選択肢を抽出する
  const filterOptions = (
    options: string[],
    { inputValue }: { inputValue: string }
  ) => {
    return options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    )
  }

  return (
    <Stack
      component="form"
      noValidate
      spacing={3}
      onSubmit={(e) => e.preventDefault()}
    >
      <Typography variant="h6" component="h2">
        助成金検索
      </Typography>
      <Controller
        name="name"
        control={control}
        rules={{ required: '助成金名を入力してください' }}
        render={({ field }) => (
          <Autocomplete
            options={subsidies.map((subsidy) => subsidy.subsidyName.name)}
            value={
              field.value || router.isReady
                ? (router.query.subsidyName as string)
                : null
            }
            onChange={(event, newValue) => {
              onSubsidyChange(newValue)
              field.onChange(newValue)
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            onKeyDown={(event) => {
              const filtered = filterOptions(
                subsidies.map((subsidy) => subsidy.subsidyName.name),
                { inputValue }
              )
              handleKeyDown(event, filtered)
            }}
            filterOptions={filterOptions}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="助成金名"
                variant="standard"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
        )}
      />
    </Stack>
  )
}
