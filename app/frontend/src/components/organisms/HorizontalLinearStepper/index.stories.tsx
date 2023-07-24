import { HorizontalLinearStepper } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof HorizontalLinearStepper> = {
  title: 'organisms/HorizontalLinearStepper',
  component: HorizontalLinearStepper,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof HorizontalLinearStepper>

export const Default: Story = {
  args: {
    fetchedQuestions: [
      {
        id: 1,
        answerType: 'boolean',
        text: '現在住んでいる市町区村の住民票がある',
        subsidyId: 3,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        propertyName: 'isResidency',
      },
      {
        id: 2,
        answerType: 'boolean',
        text: '出生届出後に面談を行った',
        subsidyId: 3,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        propertyName: 'haveChildcareInterview',
      },
      {
        id: 3,
        answerType: 'boolean',
        text: '妊娠届出時に面談を行った',
        subsidyId: 3,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        propertyName: 'havePregnancyInterview',
      },
    ],
  },
}
