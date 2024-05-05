import React, { useState, useEffect } from 'react'
import { Stack, TextField, Autocomplete, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Prefecture, Municipality } from '@prisma/client'

type ReactHookFormInputs = {
  prefectures: Prefecture | null
  municipalities: Municipality | null
}

type RegionSearchFormProps = {
  prefectures: Prefecture[]
  municipalities: Municipality[]
}

export function RegionSearchForm({
  prefectures,
  municipalities,
}: RegionSearchFormProps) {
  const router = useRouter()
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<ReactHookFormInputs>({
    defaultValues: {
      prefectures: null,
      municipalities: null,
    },
  })

  const [municipalitiesOptions, setMunicipalitiesOptions] = useState<
    Municipality[]
  >([])

  // クエリパラメータを読み込んでフォームに値を設定する
  useEffect(() => {
    const queryPrefecture = Number(router.query.prefecture)
    const queryMunicipality = Number(router.query.municipality)

    const selectedPrefecture = prefectures.find((p) => p.id === queryPrefecture)
    if (selectedPrefecture) {
      const filteredMunicipalities = municipalities.filter(
        (m) => m.prefectureId === selectedPrefecture.id
      )
      setMunicipalitiesOptions(filteredMunicipalities)
      const selectedMunicipality =
        filteredMunicipalities.find((m) => m.id === queryMunicipality) || null
      setValue('prefectures', selectedPrefecture)
      setValue('municipalities', selectedMunicipality)
    }
  }, [router.isReady, router.query, municipalities, prefectures, setValue])

  // クエリパラメーターを更新するためのコールバック関数
  // 例えばパラメーターを削除する際にprefecture=となるため、この関数オブジェクトを呼ぶ
  function updateRouterQuery(changes: { [key: string]: number | null }) {
    const newQuery = { ...router.query }
    Object.entries(changes).forEach(([key, value]) => {
      if (value === null) {
        delete newQuery[key]
      } else {
        newQuery[key] = value.toString()
      }
    })

    router.push({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true,
    })
  }

  const onPrefectureChange = (newValue: Prefecture | null) => {
    const newMunicipalities = newValue
      ? municipalities.filter((m) => m.prefectureId === newValue.id)
      : []
    setMunicipalitiesOptions(newMunicipalities)
    setValue('municipalities', null)

    updateRouterQuery({ prefecture: newValue?.id || null, municipality: null })
  }

  const onMunicipalitiesChange = (newValue: Municipality | null) => {
    updateRouterQuery({ municipality: newValue?.id || null })
  }

  return (
    <Stack
      component="form"
      noValidate
      spacing={2}
      onSubmit={(e) => e.preventDefault()}
    >
      <Typography variant="h6" component="h2">
        地域検索
      </Typography>
      <Controller
        name="prefectures"
        control={control}
        render={({ field }) => (
          <Autocomplete
            options={prefectures}
            value={field.value}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            onChange={(event, newValue) => {
              onPrefectureChange(newValue)
              field.onChange(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="都道府県"
                variant="standard"
                error={!!errors.prefectures}
                helperText={errors.prefectures?.message || ''}
              />
            )}
          />
        )}
      />
      <Controller
        name="municipalities"
        control={control}
        render={({ field }) => (
          <Autocomplete
            options={municipalitiesOptions}
            value={field.value}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            onChange={(event, newValue) => {
              onMunicipalitiesChange(newValue)
              field.onChange(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="市区町村"
                variant="standard"
                error={!!errors.municipalities}
                helperText={errors.municipalities?.message || ''}
              />
            )}
          />
        )}
      />
    </Stack>
  )
}
