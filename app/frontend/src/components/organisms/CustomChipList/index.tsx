import * as React from 'react'
import { useState } from 'react'
import { Chip, Box } from '@mui/material'

export interface CustomChipListProps {
  /** 表示したいChipのラベルを格納した配列オブジェクト */
  labels: string[]
}

export function CustomChipList({ labels }: CustomChipListProps) {
  const [chipData, setChipData] = useState<
    Array<{ label: string; filled: boolean }>
  >(labels.map((label) => ({ label, filled: false }))) // chipがクリックされているかいないかの状態
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]) //

  const handleClick = (index: number) => {
    const newChipData = [...chipData]
    newChipData[index].filled = !newChipData[index].filled
    setChipData(newChipData)

    const newSelectedLabels = newChipData
      .filter((chip) => chip.filled)
      .map((chip) => chip.label)
    setSelectedLabels(newSelectedLabels)
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
