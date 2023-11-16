import React from 'react'
import { useState } from 'react'
import { Chip, Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setInformationFilter } from '@/src/slice'

export interface InformationFilterProps {
  /** 表示したいChipのラベルを格納した配列オブジェクト */
  labels: string[]
}

/** お知らせリストをChipで絞り込むフィルター */
export function InformationFilter({ labels }: InformationFilterProps) {
  const [chipData, setChipData] = useState<
    Array<{ label: string; filled: boolean }>
  >(labels.map((label) => ({ label, filled: false }))) // chipがクリックされているかいないかのローカルステート
  const dispatch = useDispatch()

  /** Chipをクリックしたときに呼ばれるコールバック関数 */
  const handleClick = (index: number) => {
    // クリックされたとき、Chipのvariantを変化させるためのフラグを切り替える
    const newChipData = [...chipData]
    newChipData[index].filled = !newChipData[index].filled
    setChipData(newChipData)

    // クリックされたChipのラベルを要素とした配列オブジェクトを格納する
    const newSelectedLabels = newChipData
      .filter((chip) => chip.filled)
      .map((chip) => chip.label)
    dispatch(setInformationFilter(newSelectedLabels))
  }
  return (
    // 注意 Stackコンポーネントはすべての子要素に属性を付与する。そのため、２行目以降の初めの要素に対して左マージンを適用してしまい、余白ができる。
    // Stackは使用しない
    <>
      <Box sx={{ maxWidth: 320, display: 'flex', flexWrap: 'wrap' }}>
        {chipData.map((chip, index) => (
          <Box key={index} sx={{ m: '0 8px 8px 0' }}>
            <Chip
              label={chip.label}
              variant={chip.filled ? 'filled' : 'outlined'}
              onClick={() => handleClick(index)}
            />
          </Box>
        ))}
      </Box>
    </>
  )
}
