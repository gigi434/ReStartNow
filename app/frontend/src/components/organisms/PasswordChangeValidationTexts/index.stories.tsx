import { PasswordChangeValidationTexts } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'

const meta: Meta<typeof PasswordChangeValidationTexts> = {
  title: 'organisms/PasswordChangeValidationTexts',
  component: PasswordChangeValidationTexts,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
}

export default meta

type Story = StoryObj<typeof PasswordChangeValidationTexts>

const Template: Story = {
  args: {
    validationResults: [
      {
        test: /^(?=.{8,40})/,
        message: '8文字以上40文字以下で入力してください',
        isPassed: true,
      },
      {
        test: /(?=.*[a-z])/,
        message: '英字の小文字を含める必要があります',
        isPassed: true,
      },
      {
        test: /(?=.*[A-Z])/,
        message: '英字の大文字を含める必要があります',
        isPassed: true,
      },
      {
        test: /(?=.*[0-9])/,
        message: '数字を含める必要があります',
        isPassed: true,
      },
      {
        test: /(?=.*[^a-zA-Z0-9])/,
        message: '英数字以外の記号を含める必要があります',
        isPassed: true,
      },
    ],
  },
}

export const Default: Story = {
  ...Template,
}
