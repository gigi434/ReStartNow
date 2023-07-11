import { Grid, Container } from '@mui/material'
import * as React from 'react'
import { useQuery } from 'react-query'
import { Information } from '@prisma/client'
import {
  Header,
  Footer,
  InformationFilter,
  InformationList,
} from '@/src/components'
import axios from 'axios'
import { useTheme } from '@mui/system'

// Define the type for the component's props
type ListWithChipFilterProps = {
  id: number
}
type ClientSideInformation = Omit<Information, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export function ListWithChipFilter({ id }: ListWithChipFilterProps) {
  const theme = useTheme()
  const {
    data: informations,
    isLoading,
    isError,
  } = useQuery(['informations', id], fetchInformation)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching information</div>
  }
  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        {/* ヘッダー */}
        <Grid item sx={{ width: '100%' }}>
          <Header />
        </Grid>
        {/* コンテンツ */}
        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          minHeight={`calc(100vh - ${theme.spacing(8)})`}
          margin={theme.spacing(5)}
        >
          {/* お知らせ検索チップ */}
          <Grid item spacing={2}>
            <InformationFilter
              labels={[
                'development',
                'operation',
                'design',
                'analysis',
                'testing',
              ]}
            />
          </Grid>

          {/* お知らせ一覧 */}
          <Grid item>
            <InformationList informations={informations || []} />
          </Grid>
        </Grid>
        {/* フッター */}
        <Grid item sx={{ width: '100%' }}>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  )
}

async function fetchInformation(): Promise<ClientSideInformation[]> {
  const { data } = await axios.get<ClientSideInformation[]>(
    process.env.NODE_ENV === 'development'
      ? `/informations`
      : `/api/informations`
  )

  return data
}
