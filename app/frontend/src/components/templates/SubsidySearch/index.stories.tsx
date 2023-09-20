import { SubsidySearch } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SubsidySearch> = {
  title: 'templates/SubsidySearch',
  component: SubsidySearch,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SubsidySearch>

const Template: Story = {
  args: {
    subsidies: [
      {
        id: 1,
        name: 'example text',
        ageLimit: '特になし',
        applicationAddress: '市町区村',
        applicationMethod: '郵送',
        applicationRequirements: '特になし',
        amountReceived: '最大12万円',
        status: 'Continuation',
        deadlineForReceipt: 50,
        description: 'example text',
        municipalityId: 2,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
      },
      {
        id: 2,
        name: 'example text2',
        ageLimit: '特になし',
        applicationAddress: '市町区村',
        applicationMethod: '郵送',
        applicationRequirements: '特になし',
        amountReceived: '最大12万円',
        status: 'Continuation',
        deadlineForReceipt: 50,
        description: 'example text',
        municipalityId: 2,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
      },
    ],
  },
}

export const Default: Story = {
  ...Template,
}

export const FetchedError: Story = {
  ...Template,
  args: {
    subsidies: [],
  },
}
