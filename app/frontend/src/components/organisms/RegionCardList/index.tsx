import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { BasicPagination, Card, LinkCard } from '@/src/components'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/store'
import { useFetchMunicipalities } from '@/src/hooks'
import { ClientSideMunicipality } from '@/src/types'

export function RegionCardList() {
  const { data: municipalities, isError: fetchMunicipalitiesError } =
    useFetchMunicipalities()
  const region = useSelector((state: RootState) => state.region)
  const [page, setPage] = useState(1)
  const [relatedMunicipalities, setRelatedMunicipalities] = useState<
    ClientSideMunicipality[]
  >([])
  const cardsPerPage = 8
  const totalCards = relatedMunicipalities.length
  const totalPages = Math.ceil(totalCards / cardsPerPage)
  const startIndex = (page - 1) * cardsPerPage
  const endIndex = startIndex + cardsPerPage

  useEffect(() => {
    if (region.municipality) {
      setRelatedMunicipalities(
        municipalities?.filter(
          (municipality) => municipality.id === region.municipality?.id
        ) || []
      )
    } else if (region.prefecture) {
      setRelatedMunicipalities(
        municipalities?.filter(
          (municipality) => municipality.prefectureId === region.prefecture?.id
        ) || []
      )
    } else {
      setRelatedMunicipalities(municipalities || [])
    }
  }, [region, municipalities])

  if (fetchMunicipalitiesError || !municipalities) {
    return <div>Error fetching municipalities</div>
  }

  function getFileName(path: string): string {
    const fileNameWithExtension = path.split('/').pop()
    const fileName = fileNameWithExtension?.split('.').shift()
    return fileName || ''
  }

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
        {relatedMunicipalities?.slice(startIndex, endIndex).map((card) => (
          <Grid item key={card.name} xs={6} sm={6} md={3}>
            <LinkCard
              image={card.municipalSymbolPath}
              title={card.name}
              href={`/municipalities/${getFileName(card.municipalSymbolPath)}`}
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
