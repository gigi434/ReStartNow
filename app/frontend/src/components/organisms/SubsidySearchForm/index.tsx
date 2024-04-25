import { Stack, TextField, Typography, Autocomplete } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import React, { useState } from 'react'
import { CustomSubsidy } from '@/src/utils'
import { useRouter } from 'next/router'

type Inputs = {
  subsidy: CustomSubsidy | null
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
      subsidy: null,
    },
  })

  const onSubsidyChange = (subsidy: CustomSubsidy | null) => {
    const newQuery = { ...router.query }

    //
    if (!subsidy) {
      delete newQuery.subsidy
    } else {
      newQuery.subsidy = subsidy.subsidyName.id.toString()
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

  const handleKeyDown = (
    event: React.KeyboardEvent,
    filteredOptions: CustomSubsidy[]
  ) => {
    if (
      event.key === 'Enter' &&
      filteredOptions.length > 0 &&
      !event.defaultPrevented
    ) {
      onSubsidyChange(filteredOptions[0])
    }
  }

  const filterOptions = (
    options: CustomSubsidy[],
    { inputValue }: { inputValue: string }
  ) => {
    return options.filter((option) =>
      option.subsidyName.name.toLowerCase().includes(inputValue.toLowerCase())
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
        name="subsidy"
        control={control}
        render={({ field }) => (
          <Autocomplete
            options={subsidies}
            getOptionLabel={(option) => option.subsidyName.name}
            value={field.value}
            onChange={(event, newValue) => {
              onSubsidyChange(newValue)
              field.onChange(newValue)
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            onKeyDown={(event) => {
              const filtered = filterOptions(subsidies, { inputValue })
              handleKeyDown(event, filtered)
            }}
            filterOptions={(options, state) => filterOptions(options, state)}
            isOptionEqualToValue={(option, value) =>
              option?.subsidyName.id === value?.subsidyName.id
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="助成金名"
                variant="standard"
                error={!!errors.subsidy}
                helperText={errors.subsidy ? errors.subsidy.message : ''}
              />
            )}
          />
        )}
      />
    </Stack>
  )
}
