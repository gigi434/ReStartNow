import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { BasicPagination, LinkCard } from '@/src/components'
import { useRouter } from 'next/router'
import type { Municipality } from '@prisma/client'

type RegionCardListProps = {
  municipalities: Municipality[]
}

export function RegionCardList({ municipalities }: RegionCardListProps) {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [relatedMunicipalities, setRelatedMunicipalities] = useState<
    Municipality[]
  >([])
  // 一度に表示するカードの数
  const cardsPerPage = 8
  // ページネーションを計算
  const totalCards = relatedMunicipalities.length
  const totalPages = Math.ceil(totalCards / cardsPerPage)
  const startIndex = (page - 1) * cardsPerPage
  const endIndex = startIndex + cardsPerPage

  useEffect(() => {
    // クエリパラメータから都道府県IDと市町区村IDを取得
    const queryPrefecture = Number(router.query.prefecture)
    const queryMunicipality = Number(router.query.municipality)

    let filteredMunicipalities = municipalities

    if (queryMunicipality) {
      // 市町区村IDに基づいてフィルタリング
      filteredMunicipalities = municipalities.filter(
        (m) => m.id === queryMunicipality
      )
    } else if (queryPrefecture) {
      // 都道府県IDに基づいてフィルタリング
      filteredMunicipalities = municipalities.filter(
        (m) => m.prefectureId === queryPrefecture
      )
    }

    setRelatedMunicipalities(filteredMunicipalities)
  }, [router.isReady, router.query, municipalities])

  // ページ変更ハンドラ
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{ flexGrow: 1 }}
      width={'100%'}
    >
      {/* 市町区村のカード一覧 */}
      <Grid container spacing={2} sx={{ flexGrow: 1 }} minHeight={'440px'}>
        {relatedMunicipalities
          .slice(startIndex, endIndex)
          .map((municipality) => (
            <Grid item key={municipality.name} xs={6} sm={6} md={3}>
              <LinkCard
                image={`${municipality.municipalSymbolPath}.png`}
                title={municipality.name}
                href={`/subsidies/${municipality.id}`}
                clickable={true}
              />
            </Grid>
          ))}
      </Grid>
      {/* ページャー */}
      <Grid item xs={12} container justifyContent="flex-end">
        <BasicPagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Grid>
    </Grid>
  )
}
