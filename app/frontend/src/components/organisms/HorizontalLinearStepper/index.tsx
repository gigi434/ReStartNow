import React from 'react'
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
  Link as MuiLink,
} from '@mui/material'
import { ProgressBar } from '@/src/components'
import {
  QuestionsBySubsidyId,
  postResultByQuestions,
} from '@/src/utils/queries'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ErrorCode } from '@/src/lib/error'
import * as Sentry from '@sentry/nextjs'

type HorizontalLinearStepperProps = {
  fetchedQuestions: QuestionsBySubsidyId
}

export function HorizontalLinearStepper({
  fetchedQuestions,
}: HorizontalLinearStepperProps) {
  const { questions, relatedLink } = fetchedQuestions
  const theme = useTheme()
  const router = useRouter()
  const [activeStep, setActiveStep] = React.useState(0) // アクティブなステップのインデックスを管理するstate
  const [answers, setAnswers] = React.useState<{
    [key: string]: string | boolean
  }>({}) // 利用者の回答を格納する
  const [grantAmount, setGrantAmount] = React.useState<
    number | boolean | null
  >()

  if (questions.length === 0) {
    throw new Error('questions fetching error is occured')
  }
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
      // 前の回答状況と入力された回答を定義する
      return {
        ...prevAnswers,
        [questions[activeStep].propertyName]: event.target.value,
      }
    })
  }

  /** 最後の質問が表示された後、結果を表示するためのコールバック関数 */
  const handleSubmit = async () => {
    // リクエストとして送信する前に型を文字列型から任意の型に変換する
    const convertedAnswers = Object.entries(answers).reduce(
      (acc, [key, value]) => {
        if (value === 'true') {
          acc[key] = true
        } else if (value === 'false') {
          acc[key] = false
        } else if (typeof value === 'string' && /^\d+$/.test(value)) {
          // 正規表現で数値のみの文字列をチェック
          acc[key] = Number(value) // 数値の文字列を数値に変換
        } else {
          acc[key] = value
        }
        return acc
      },
      {} as { [key: string]: string | boolean | number }
    )

    try {
      const data = await postResultByQuestions({
        answers: convertedAnswers,
        subsidyId: Number(router.query.subsidyId),
      })
      setGrantAmount(data?.amount)
      if (activeStep < questions.length) handleNext() // ステップを進める
    } catch (err) {
      throw new Error(ErrorCode.InvalidGrantRequest)
    }
  }

  return (
    <Stack spacing={5}>
      {/* プログレスバー */}
      <ProgressBar progress={progress} />
      {/* 質問事項がなければ結果を表示する */}
      {activeStep === questions.length ? (
        <Box minHeight={theme.spacing(23)}>
          {/* 受給資格がなければないことを表示し、あれば受給金額を表示する */}
          <Typography>
            {typeof grantAmount === 'boolean' ||
            grantAmount === null ||
            grantAmount === undefined
              ? '受給資格がありません'
              : `受給できそうな金額： ${new Intl.NumberFormat('ja-JP', {
                  style: 'currency',
                  currency: 'JPY',
                }).format(grantAmount)}`}
          </Typography>
          <Typography>
            質問作成の参照先:{' '}
            <Link href={relatedLink} passHref legacyBehavior>
              <MuiLink target="_brank" rel="noopener">
                {/* 禁則処置を考慮しながらもコンテンツボックスからあふれる場合に、ブラウザーが改行を挿入する */}
                <Typography
                  style={{
                    whiteSpace: 'pre-line',
                    wordBreak: 'normal',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {relatedLink}
                </Typography>
              </MuiLink>
            </Link>
          </Typography>
        </Box>
      ) : (
        <Box minHeight={theme.spacing(23)}>
          {/* 質問文 */}
          <Box minHeight={theme.spacing(12)}>
            <Typography variant="body1" gutterBottom>
              {questions[activeStep].text}
            </Typography>
          </Box>
          {/* 回答種類が論理型であるならはいかいいえの二択を表示し、数値型ならインプット要素を表示する */}
          {/* 注意：論理型のvalue属性を文字列型ではなく論理型にして格納するといいえボタンをクリックしても反応しなくなるため、 送信する際に値を文字列から論理型にする*/}
          {questions[activeStep].answerType === 'CHOICE' ? (
            <RadioGroup
              aria-label={`question-${questions[activeStep].propertyName}`}
              name={`question-${questions[activeStep].propertyName}`}
              value={answers[questions[activeStep].propertyName] || ''}
              onChange={handleChange}
            >
              {questions[activeStep].questionChoice.map((choiceItem) => (
                <FormControlLabel
                  key={choiceItem.choiceId}
                  value={choiceItem.choice.value}
                  control={<Radio />}
                  label={choiceItem.choice.text}
                />
              ))}
            </RadioGroup>
          ) : questions[activeStep].answerType === 'BOOLEAN' ? (
            <RadioGroup
              aria-label={`question-${questions[activeStep].propertyName}`}
              name={`question-${questions[activeStep].propertyName}`}
              value={answers[questions[activeStep].propertyName] || ''}
              onChange={handleChange}
            >
              <FormControlLabel
                value={'true'}
                control={<Radio />}
                label="はい"
              />
              <FormControlLabel
                value={'false'}
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
        {activeStep < questions.length ? (
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
                  answers[questions[activeStep].propertyName] === undefined ||
                  activeStep >= questions.length
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
