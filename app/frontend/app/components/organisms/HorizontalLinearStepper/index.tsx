import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad']

export function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0) // アクティブなステップのインデックスを管理するstate
  const [skipped, setSkipped] = React.useState(new Set<number>()) // スキップされたステップのインデックスを管理するSetオブジェクトのstate

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

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
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

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            )
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {/* 最後のステップが完了した場合の表示 */}
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {/* 戻るボタン */}
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            {/* スキップボタン */}
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}
