import { LoginForm } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'

const meta: Meta<typeof LoginForm> = {
  title: 'organisms/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LoginForm>

const Template: Story = {}
export const Success: Story = {
  ...Template,
  name: 'フォームに正しい値を入植し、ログインできた場合',
}

export const Error: Story = {
  ...Template,
  name: 'フォームに間違えた値を入力し、ログインできない場合',
  parameters: {
    msw: {
      handlers: {
        auth: rest.post('/login', async (_, res, ctx) => {
          return res(ctx.status(401), ctx.json({ success: false }))
        }),
      },
    },
  },
}
