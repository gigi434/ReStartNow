import { HorizontalLinearStepper } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof HorizontalLinearStepper> = {
  title: 'organisms/HorizontalLinearStepper',
  component: HorizontalLinearStepper,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof HorizontalLinearStepper>

const Template: Story = {
  parameters: {
    nextjs: {
      router: {
        basePath: '/profile',
      },
    },
  },
  args: {
    questions: [
      {
        id: 1,
        answerType: 'boolean',
        text: '現在住んでいる市町区村の住民票がある',
        subsidyId: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        propertyName: 'isResidency',
      },
      {
        id: 2,
        answerType: 'boolean',
        text: '出生届出後に面談を行った',
        subsidyId: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        propertyName: 'haveChildcareInterview',
      },
      {
        id: 3,
        answerType: 'boolean',
        text: '妊娠届出時に面談を行った',
        subsidyId: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        propertyName: 'havePregnancyInterview',
      },
    ],
  },
}

export const Default: Story = {
  ...Template,
}
