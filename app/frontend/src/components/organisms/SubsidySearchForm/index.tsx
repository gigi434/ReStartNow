import { Stack, TextField, Typography, Autocomplete } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSubsidySearch } from '@/src/slice'
import { RootState } from '@/src/store'
import { Subsidy } from '@prisma/client'
import { CustomSubsidy } from '@/src/utils'

// フォームで扱うデータ型を定義する
type Inputs = {
  /** 助成金の名前 */
  name: string | ''
  /** 申請先 */
  applicationAddress: string | ''
  /** 受給額 */
  amountReceived: string | ''
  /** 受給期限 */
  deadlineForReceipt: number | ''
}

type SubsidySearchFormProps = {
  subsidies: CustomSubsidy[]
}

/** 助成金の検索フォーム */
export function SubsidySearchForm({ subsidies }: SubsidySearchFormProps) {
  const subsidySearch = useSelector((state: RootState) => state.subsidySearch)
  const dispatch = useDispatch()
  const {
    control,
    formState: { errors },
  } = useForm<Inputs>()
  // 引数として受け取ったsubsidiesをフラット化する関数
  function flattenSubsidiesArray(subsidies: CustomSubsidy[]) {
    return subsidies.map((subsidy) => {
      const { subsidyName, ...rest } = subsidy
      return {
        ...rest,
        ...subsidyName,
      }
    })
  }

  const onSubsidyChange = (_prevValue: any, newValue: CustomSubsidy | null) => {
    dispatch(updateSubsidySearch(newValue))
  }
  // データ型に応じて文字列型に変換するコールバック関数
  const formatOption = (option: any): string => {
    if (typeof option === 'number') {
      return option.toString()
    }

    if (option instanceof Date) {
      return option.toLocaleDateString()
    }

    if (typeof option === 'object' && option !== null) {
      return option.name || '' // ここでオブジェクトのnameプロパティを取得しています。
    }

    return option || ''
  }

  const renderAutocomplete = (name: keyof Inputs, label: string) => (
    <Controller
      key={label}
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          options={Array.from(
            new Set(
              flattenSubsidiesArray(subsidies).map((subsidy) =>
                formatOption(subsidy.name)
              )
            )
          )}
          value={subsidySearch.subsidy?.subsidyName?.name || null}
          onChange={(event, newValue) => {
            const selectedSubsidy = subsidies.find(
              (subsidy) => subsidy.subsidyName.name === newValue
            )
            onSubsidyChange(event, selectedSubsidy || null)
            field.onChange(newValue)
          }}
          getOptionLabel={(option) => formatOption(option)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="standard"
              error={errors[name] !== undefined}
            />
          )}
          renderOption={(props, option) => {
            return (
              <li {...props} key={formatOption(option)}>
                {formatOption(option)}
              </li>
            )
          }}
        />
      )}
    />
  )

  return (
    <Stack component="form" noValidate spacing={3}>
      <Typography variant="h6" component="h2">
        助成金検索
      </Typography>
      {renderAutocomplete('name', '助成金名')}
    </Stack>
  )
}
