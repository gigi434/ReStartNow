import { Stack, TextField, Autocomplete, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import React, { useState } from 'react'
import { useFetchPrefectures, useFetchMunicipalities } from '@/src/hooks'
import { ClientSideMunicipality, ClientSidePrefecture } from '@/src/types'
import { useDispatch, useSelector } from 'react-redux'
import { setPrefecture, setMunicipality } from '@/src/slice'
import { RootState } from '@/src/store'

type Inputs = {
  prefectures: ClientSidePrefecture | null
  municipalities: ClientSideMunicipality | null
}

/**
 * 助成金一覧の表示に対応している助成金が存在する市町区村を検索して表示するテンプレート
 */
export function RegionSearchForm() {
  const dispatch = useDispatch()
  const region = useSelector((state: RootState) => state.region)

  const { data: prefectures, isError: fetchPrefecturesError } =
    useFetchPrefectures()
  const { data: municipalities, isError: fetchMunicipalitiesError } =
    useFetchMunicipalities()
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  const validationRules = {
    prefectures: {
      required: '都道府県を選択してください。',
    },
    municipalities: {
      required: '市区町村を選択してください。',
    },
  }

  // 都道府県を選択したときの市区町村の選択肢
  const [municipalitiesOptions, setMunicipalityOptions] = useState<
    ClientSideMunicipality[]
  >([])

  if (fetchPrefecturesError || !prefectures) {
    return <div>Error fetched prefectures</div>
  }
  if (fetchMunicipalitiesError || !municipalities) {
    return <div>Error fetched municipalities</div>
  }

  const onPrefectureChange = (
    _: any,
    newValue: ClientSidePrefecture | null
  ) => {
    const relatedMunicipalities = municipalities.filter(
      (municipalities) => municipalities.prefectureId === newValue?.id
    )
    setMunicipalityOptions(relatedMunicipalities) // 都道府県に値が入力されたときに都道府県に属する市町区村だけをオートコンプリートで表示する
    setValue('municipalities', null) // 都道府県の値が変更されたときにReactHookFormの市町区村の値を空にする
    dispatch(setMunicipality(null))
    dispatch(setPrefecture(newValue))
  }

  // 市区町村が変更されたときに選択状態を更新する
  const onMunicipalitiesChange = (
    _: any,
    newValue: ClientSideMunicipality | null
  ) => {
    dispatch(setMunicipality(newValue)) // 市区町村の選択状態を更新
  }

  return (
    <Stack component="form" noValidate spacing={2}>
      {/* フォームの見出し */}
      <Typography variant="h6" component="h2">
        地域検索
      </Typography>
      {/* 都道府県のインプット */}
      <Controller
        name="prefectures"
        control={control}
        rules={validationRules.prefectures}
        render={({ field }) => (
          <Autocomplete
            options={prefectures}
            value={region.prefecture} // 都道府県名を設定
            getOptionLabel={(option) => option.name} // 都道府県名を表示
            onChange={(event, newValue) => {
              onPrefectureChange(event, newValue)
              field.onChange(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="都道府県"
                variant="outlined"
                error={errors.prefectures !== undefined}
                helperText={errors.prefectures?.message}
              />
            )}
          />
        )}
      />
      {/* 市町区村のインプット */}
      <Controller
        name="municipalities"
        control={control}
        rules={validationRules.municipalities}
        render={({ field }) => (
          <Autocomplete
            options={municipalitiesOptions}
            value={region.municipality} // 内部状態を参照
            getOptionLabel={(option) => option.name} // 都道府県名を表示
            onChange={(event, newValue) => {
              onMunicipalitiesChange(event, newValue)
              field.onChange(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="市区町村"
                variant="outlined"
                error={errors.municipalities !== undefined}
                helperText={errors.municipalities?.message}
              />
            )}
          />
        )}
      />
    </Stack>
  )
}
