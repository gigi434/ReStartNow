import {
  Stack,
  TextField,
  Button,
  Autocomplete,
  Typography,
} from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import React, { useState } from 'react'

// フォームで扱うデータ型を定義します。
type Inputs = {
  prefecture: string | null
  city: string | null
}

export function RegionSearchForm() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  const validationRules = {
    prefecture: {
      required: '都道府県を選択してください。',
    },
    city: {
      required: '市区町村を選択してください。',
    },
  }

  const prefectures = ['東京都', '神奈川県', '埼玉県', '千葉県', '大阪府']
  const cities: { [key: string]: string[] } = {
    東京都: ['港区', '中央区', '渋谷区', '新宿区', '文京区'],
    神奈川県: ['横浜市', '川崎市', '鎌倉市', '藤沢市', '横須賀市'],
    埼玉県: ['さいたま市', '川越市', '上尾市', '熊谷市', '越谷市'],
    千葉県: ['千葉市', '船橋市', '市原市', '松戸市', '浦安市'],
    大阪府: ['大阪市', '堺市', '豊中市', '吹田市', '枚方市'],
  }

  const [cityOptions, setCityOptions] = useState<string[]>([])
  // 都道府県と市区町村の選択状態を内部状態として持つ
  const [prefectureValue, setPrefectureValue] = useState<string | null>(null)
  const [cityValue, setCityValue] = useState<string | null>(null)

  // 都道府県が変更されたときに市区町村の選択肢を更新し、市区町村の選択をリセットする
  const onPrefectureChange = (event: any, newValue: string | null) => {
    setCityOptions(cities[newValue as string] || [])
    setValue('city', null)
    setCityValue(null) // 市区町村の選択表示をリセット
    setPrefectureValue(newValue) // 都道府県の選択状態を更新
  }

  // 市区町村が変更されたときに選択状態を更新する
  const onCityChange = (event: any, newValue: string | null) => {
    setCityValue(newValue) // 市区町村の選択状態を更新
  }

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
          地域検索
        </Typography>
        {/* 都道府県のインプット */}
        <Controller
          name="prefecture"
          control={control}
          rules={validationRules.prefecture}
          render={({ field }) => (
            <Autocomplete
              options={prefectures}
              value={prefectureValue} // 内部状態を参照
              onChange={(event, newValue) => {
                onPrefectureChange(event, newValue)
                field.onChange(newValue)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="都道府県"
                  variant="outlined"
                  error={errors.prefecture !== undefined}
                  helperText={errors.prefecture?.message}
                />
              )}
            />
          )}
        />
        {/* 市町区村のインプット */}
        <Controller
          name="city"
          control={control}
          rules={validationRules.city}
          render={({ field }) => (
            <Autocomplete
              options={cityOptions}
              value={cityValue} // 内部状態を参照
              onChange={(event, newValue) => {
                onCityChange(event, newValue)
                field.onChange(newValue)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="市区町村"
                  variant="outlined"
                  error={errors.city !== undefined}
                  helperText={errors.city?.message}
                />
              )}
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
