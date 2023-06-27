import { useState, useEffect } from 'react'

export interface passwordValidationRulesProps {
  test: RegExp
  message: string
  isPassed: boolean
}

export const passwordValidationRules = [
  {
    rule: /^(?=.{8,40})/,
    message: '8文字以上40文字以下で入力してください',
  },
  {
    rule: /(?=.*[a-z])/,
    message: '英字の小文字を含める必要があります',
  },
  {
    rule: /(?=.*[A-Z])/,
    message: '英字の大文字を含める必要があります',
  },
  {
    rule: /(?=.*[0-9])/,
    message: '数字を含める必要があります',
  },
  {
    rule: /(?=.*[^a-zA-Z0-9])/,
    message: '英数字以外の記号を含める必要があります',
  },
]

export const usePasswordValidation = (password: string) => {
  const [validationResults, setValidationResults] = useState(
    passwordValidationRules.map((validation) => ({
      ...validation,
      isPassed: false,
    }))
  )

  useEffect(() => {
    const validatePassword = () => {
      setValidationResults(
        // パスワードが検証の一つに合格しているか比較し、isPassedプロパティを新たに定義する
        passwordValidationRules.map((validation) => ({
          ...validation,
          isPassed: validation.rule.test(password),
        }))
      )
    }
    validatePassword()
  }, [password])

  const isValid = validationResults.every((result) => result.isPassed)

  return { isValid, validationResults }
}
