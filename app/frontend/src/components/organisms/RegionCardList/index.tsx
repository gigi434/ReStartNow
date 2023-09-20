import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { BasicPagination, LinkCard } from '@/src/components'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/store'
import type { Municipality } from '@prisma/client'

type RegionCardListProps = {
  municipalities: Municipality[]
}

export function RegionCardList({ municipalities }: RegionCardListProps) {
  const region = useSelector((state: RootState) => state.region)
  const [page, setPage] = useState(1)
  const [relatedMunicipalities, setRelatedMunicipalities] =
    useState<Municipality[]>(municipalities)
  // 一度に表示するカード一覧表示数
  const cardsPerPage = 8
  // 検索条件を加味したカード表示数
  const totalCards = relatedMunicipalities.length
  // 検索条件を加味したカードページ数
  const totalPages = Math.ceil(totalCards / cardsPerPage)
  // 現在表示している始まりのカードのインデックス
  const startIndex = (page - 1) * cardsPerPage
  // 現在表示している終わりのカードのインデックス
  const endIndex = startIndex + cardsPerPage

  useEffect(() => {
    // もし市町区村の検索条件があれば、その市町区村だけを表示する
    if (region.municipality) {
      setRelatedMunicipalities(
        municipalities?.filter(
          (municipality) => municipality.id === region.municipality?.id
        ) || []
      )
      // もし都道府県の検索条件に値があれば、その値を含む市町区村を表示する
    } else if (region.prefecture) {
      setRelatedMunicipalities(
        municipalities?.filter(
          (municipality) => municipality.prefectureId === region.prefecture?.id
        ) || []
      )
      // もし検索条件がなければ、すべての市町区村を表示する
    } else {
      setRelatedMunicipalities(municipalities || [])
    }
  }, [region, municipalities])

  /** ページャーのページ番号を変更するためのコールバック関数 */
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
          .map((relatedMunicipality) => (
            <Grid item key={relatedMunicipality.name} xs={6} sm={6} md={3}>
              <LinkCard
                image={relatedMunicipality.municipalSymbolPath}
                title={relatedMunicipality.name}
                href={`/subsidies/${relatedMunicipality.id}`}
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
