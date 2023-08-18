import {
  Stack,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSubsidySearch } from '@/src/slice'
import { RootState } from '@/src/store'
import { useFetchSubsidies } from '@/src/hooks'

// フォームで扱うデータ型を定義します。
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
  municipalityId: number
}

/** 助成金の検索フォーム */
export function SubsidySearchForm({ municipalityId }: SubsidySearchFormProps) {
  const { data: subsidies, isError: fetchSubsidiesError } =
    useFetchSubsidies(municipalityId)
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
    },
  })

  if (fetchSubsidiesError || !subsidies) {
    return <div>Error fetched subsidies</div>
  }

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    dispatch(updateSubsidySearch(data))
  }

  const renderAutocomplete = (name: keyof Inputs, label: string) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          // 助成金レコードから一意な値を見つける
          options={Array.from(
            new Set(
              subsidies.map((subsidy) => subsidy[name as keyof typeof subsidy])
            )
          )}
          value={field.value || null}
          onChange={(event, newValue) => {
            field.onChange(newValue)
          }}
          getOptionLabel={(option) =>
            typeof option === 'number' ? option.toString() : option
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="standard"
              error={errors[name] !== undefined}
            />
          )}
        />
      )}
    />
  )

  return (
    <section>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        spacing={3}
      >
        <Typography variant="h6" component="h2">
          助成金検索
        </Typography>
        {renderAutocomplete('name', '助成金名')}
        <Button variant="contained" type="submit" color="primary">
          検索
        </Button>
      </Stack>
    </section>
  )
}
