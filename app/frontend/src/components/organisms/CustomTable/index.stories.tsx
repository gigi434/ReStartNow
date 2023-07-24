import { CustomTable } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof CustomTable> = {
  title: 'organisms/CustomTable',
  component: CustomTable,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CustomTable>

const Template: Story = {}
export const Default: Story = {
  ...Template,
  args: {
    Subsidies: [
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
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
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
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
      },
    ],
  },
}
