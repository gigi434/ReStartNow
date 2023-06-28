import { Stack, Grid, Button } from '@mui/material'
import * as React from 'react'
import { useQuery } from 'react-query'
import { Information } from '@prisma/client'

export function InformationArticle() {
  const { data, isLoading, isError } = useQuery<Information[]>(
    'informations',
    fetchInformations
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data</div>
  }
  return (
    <section>
      <Stack>
        {/* 戻るボタン */}
        {/* 見出し */}
        {/* 公開日 */}
        {/* 更新日 */}
        {/* 分割線 */}
        {/* 本文 */}
      </Stack>
    </section>
  )
}

async function fetchInformations() {
  const response = await fetch(
    process.env.NODE_ENV === 'development' ? '/information' : '/api/information'
  )
  if (!response.ok) {
    throw new Error('Failed to fetch informations')
  }
  const data = await response.json()
  return data
}
