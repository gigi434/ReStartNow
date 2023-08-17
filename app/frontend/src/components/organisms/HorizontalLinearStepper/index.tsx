import * as React from 'react'
import {
  Button,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Box,
  useTheme,
} from '@mui/material'
import { ClientSideQuestion } from '@/src/types'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { ProgressBar } from '@/src/components'

type HorizontalLinearStepperProps = {
  questions: ClientSideQuestion[]
}

export function HorizontalLinearStepper({
  questions,
}: HorizontalLinearStepperProps) {
  const theme = useTheme()
  const params = useParams()
  const [activeStep, setActiveStep] = React.useState(0) // アクティブなステップのインデックスを管理するstate
  const [answers, setAnswers] = React.useState<{
    [key: string]: string | boolean
  }>({}) // 利用者の回答を格納する
  const [grantAmount, setGrantAmount] = React.useState<number | boolean>()

  // アクティブなステップに基づいてプログレスを計算
  const progress = (activeStep / questions.length) * 100

  /** 次のステップに進むための関数 */
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  /** 前のステップに戻るための関数 */
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  /** ステップをリセットするための関数 */
  const handleReset = () => {
    setActiveStep(0)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers((prevAnswers) => {
      return {
        ...prevAnswers,
        [questions[activeStep].propertyName]: event.target.value,
      }
    })
  }

  /** 最後の質問が表示された後、結果を表示するためのコールバック関数 */
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        process.env.NODE_ENV === 'development'
          ? `/result/${params.subsidyId}`
          : `/api/result/${params.subsidyId}`,
        {
          ...answers,
        }
      )
      await setGrantAmount(response.data.amount as number | boolean)
      handleNext() // ステップを進める
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Stack spacing={5}>
      {/* プログレスバー */}
      <ProgressBar progress={progress} />
      {/* 質問事項がなければ結果を表示する */}
      {activeStep === questions.length ? (
        <Box minHeight={theme.spacing(23)}>
          <Typography>
            {typeof grantAmount === 'boolean'
              ? '受給資格がありません'
              : `受給額： ${grantAmount}`}
          </Typography>
        </Box>
      ) : (
        <Box minHeight={theme.spacing(23)}>
          {/* 質問文 */}
          <Box minHeight={theme.spacing(12)}>
            <Typography variant="h6">{questions[activeStep].text}</Typography>
          </Box>
          {/* 回答種類が論理型であるならはいかいいえの二択を表示し、数値型ならインプット要素を表示する */}
          {questions[activeStep].answerType === 'boolean' ? (
            <RadioGroup
              aria-label={`question-${questions[activeStep].propertyName}`}
              name={`question-${questions[activeStep].propertyName}`}
              value={answers[questions[activeStep].propertyName] || ''}
              onChange={handleChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="はい" />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="いいえ"
              />
            </RadioGroup>
          ) : (
            <TextField
              id={`question-${questions[activeStep].propertyName}`}
              type="number"
              value={answers[questions[activeStep].propertyName] || ''}
              onChange={handleChange}
            />
          )}
        </Box>
      )}
      <Box>
        {/* 質問事項があれば戻るボタンと次へボタンを表示する */}
        {activeStep !== questions.length ? (
          <Stack spacing={2} direction="row" justifyContent="space-between">
            <Stack spacing={2} direction="row">
              {/* 戻るボタン */}
              <Button
                variant={'outlined'}
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                disabled={
                  answers[questions[activeStep].propertyName] === undefined
                }
                variant={'contained'}
                onClick={
                  activeStep === questions.length - 1
                    ? handleSubmit
                    : handleNext
                }
              >
                {activeStep === questions.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Stack>
            <Button
              variant={'contained'}
              color="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Stack>
        ) : (
          <Stack direction={'row'} justifyContent={'flex-end'}>
            <Button
              variant={'contained'}
              color="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Stack>
        )}
      </Box>
    </Stack>
  )
}
