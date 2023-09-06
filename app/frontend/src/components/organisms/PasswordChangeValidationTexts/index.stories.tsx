import { PasswordChangeValidationTexts } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

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
        message: '8文字以上40文字以下で入力してください',
        isPassed: true,
      },
      {
        message: '英字の小文字を含める必要があります',
        isPassed: true,
      },
      {
        message: '英字の大文字を含める必要があります',
        isPassed: true,
      },
      {
        message: '数字を含める必要があります',
        isPassed: true,
      },
      {
        message: '英数字以外の記号を含める必要があります',
        isPassed: true,
      },
    ],
  },
}

export const Default: Story = {
  ...Template,
}
