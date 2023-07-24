import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { ClientSideQuestion } from '@/src/types'
import axios from 'axios'

type HorizontalLinearStepperProps = {
  fetchedQuestions: ClientSideQuestion[]
}

export function HorizontalLinearStepper({
  fetchedQuestions,
}: HorizontalLinearStepperProps) {
  const [activeStep, setActiveStep] = React.useState(0) // アクティブなステップのインデックスを管理するstate
  const [skipped, setSkipped] = React.useState(new Set<number>()) // スキップされたステップのインデックスを管理するSetオブジェクトのstate
  const [questions, setQuestions] = React.useState(
    fetchedQuestions.map((question) => question.text)
  ) // フェッチした質問を格納する
  const [answers, setAnswers] = React.useState<{
    [key: string]: string | boolean
  }>({}) // 利用者の回答を格納する
  const [grantAmount, setGrantAmount] = React.useState<number | boolean>()

  /** ステップがオプションかどうかを判定する関数 */
  const isStepOptional = (step: number) => {
    return step === 1
  }

  /** ステップがスキップされたかどうかを判定する関数 */
  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  /** 次のステップに進むための関数 */
  const handleNext = () => {
    let newSkipped = skipped
    // ステップがスキップされた場合、スキップを解除する
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1) // ここで次のステップに進めます
    setSkipped(newSkipped)
  }

  /** 前のステップに戻るための関数 */
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  /** ステップをスキップするための関数 */
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // オプションではないステップをスキップしようとする場合はエラーをスローする（通常は発生しない想定）
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  /** ステップをリセットするための関数 */
  const handleReset = () => {
    setActiveStep(0)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers((prevAnswers) => {
      return {
        ...prevAnswers,
        [fetchedQuestions[activeStep].propertyName]: event.target.value,
      }
    })
  }

  /** 最後の質問が表示された後、結果を表示するためのコールバック関数 */
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        process.env.NODE_ENV === 'development' ? `/result/1` : '/api/result',
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
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {questions.map((question, index) => (
          <Step key={index}>
            <StepLabel>{question}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === questions.length ? (
        <Typography sx={{ mt: 2, mb: 1 }}>
          {/* 返り値の型がbooleanであれば受給資格なし */}
          {typeof grantAmount === 'boolean'
            ? '受給資格がありません'
            : `受給額： ${grantAmount}`}
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
          {/* 質問本文 */}
          <Typography variant="h6">
            {fetchedQuestions[activeStep].text}
          </Typography>

          {/* 回答するためのインプット要素 */}
          {fetchedQuestions[activeStep].answerType === 'boolean' ? (
            <RadioGroup
              aria-label={`question-${fetchedQuestions[activeStep].propertyName}`}
              name={`question-${fetchedQuestions[activeStep].propertyName}`}
              value={answers[fetchedQuestions[activeStep].propertyName] || ''}
              onChange={handleChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="はい" />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="いいえ"
              />
            </RadioGroup>
          ) : fetchedQuestions[activeStep].answerType === 'number' ? (
            <TextField
              id={`question-${fetchedQuestions[activeStep].propertyName}`}
              type="number"
              value={answers[fetchedQuestions[activeStep].propertyName] || ''}
              onChange={handleChange}
            />
          ) : (
            <TextField
              id={`question-${fetchedQuestions[activeStep].propertyName}`}
              type="number"
              value={answers[fetchedQuestions[activeStep].propertyName] || ''}
              onChange={handleChange}
            />
          )}
          {/* 一つ前の質問に戻るボタン */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            {/* 次の質問に進むボタン　質問がなければ結果を見るボタンになる */}
            <Button
              onClick={
                activeStep === questions.length - 1 ? handleSubmit : handleNext
              }
            >
              {activeStep === questions.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}
