import { Grid, Container, useTheme } from '@mui/material'
import { Header, Footer, HorizontalLinearStepper } from '@/src/components'
import * as React from 'react'
import { useFetchQuestions } from '@/src/hooks'

type QuestionAndAnswerProps = {
  subsidyId: number
}

export function QuestionAndAnswer({ subsidyId }: QuestionAndAnswerProps) {
  const theme = useTheme()
  const {
    data: fetchedQuestions,
    isLoading,
    isError,
  } = useFetchQuestions(subsidyId)
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !fetchedQuestions) {
    return <div>Error fetching question</div>
  }

  return (
    <Grid container direction="column">
      {/* ヘッダー */}
      <Grid item xs={12}>
        <Header />
      </Grid>
      {/* コンテンツ */}
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          pt: theme.spacing(5),
          px: theme.spacing(4),
          pb: theme.spacing(8),
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          minHeight={`calc(100vh - ${theme.spacing(8)})`}
          spacing={2}
        >
          <Grid item xs={12}>
            {/* ステッパー */}
            <HorizontalLinearStepper fetchedQuestions={fetchedQuestions} />
          </Grid>
        </Grid>
      </Container>
      {/* フッター */}
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}
