import { Stack, TextField, Typography, Autocomplete } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSubsidySearch } from '@/src/slice'
import { RootState } from '@/src/store'
import { Subsidy } from '@prisma/client'

// フォームで扱うデータ型を定義する
type Inputs = {
  /** 助成金の名前 */
  name: string | ''
  /** 申請先 */
  applicationAddress: string | ''
  /** 年齢制限 */
  ageLimit: string | ''
  /** 受給額 */
  amountReceived: string | ''
  /** 受給期限 */
  deadlineForReceipt: number | null
}

type SubsidySearchFormProps = {
  subsidies: Subsidy[]
}

/** 助成金の検索フォーム */
export function SubsidySearchForm({ subsidies }: SubsidySearchFormProps) {
  const subsiydSearch = useSelector((state: RootState) => state.subsidySearch)
  const dispatch = useDispatch()
  const {
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubsidyChange = (_prevValue: any, newValue: Subsidy | null) => {
    dispatch(updateSubsidySearch(newValue))
    console.log(subsiydSearch.subsidy)
  }
  const formatOption = (option: string | number | Date): string => {
    if (typeof option === 'number') {
      return option.toString()
    }

    if (option instanceof Date) {
      return option.toLocaleDateString()
    }

    return option
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
              subsidies.map((subsidy) => subsidy[name as keyof typeof subsidy])
            )
          )}
          value={
            subsiydSearch.subsidy?.[
              name as keyof typeof subsiydSearch.subsidy
            ] || null
          }
          onChange={(event, newValue) => {
            const selectedSubsidy = subsidies.find(
              (subsidy) => subsidy[name as keyof typeof subsidy] === newValue
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
