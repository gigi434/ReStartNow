import * as React from 'react'
import { ValidationResultText } from '@/src/components'
import { passwordValidationRulesProps } from '@/src/hooks'

export interface PasswordChangeValidationTextsProps {
  /** 監視したいインプット要素の値 */
  validationResults: passwordValidationRulesProps[]
}

export function PasswordChangeValidationTexts({
  validationResults,
}: PasswordChangeValidationTextsProps) {
  return (
    <>
      {validationResults.map((result, index) => (
        <ValidationResultText
          key={index}
          isPassed={result.isPassed}
          message={result.message}
        />
      ))}
    </>
  )
}
