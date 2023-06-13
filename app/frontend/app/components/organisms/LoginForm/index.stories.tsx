import { LoginForm } from '../../index'
import type { Meta, StoryObj } from '@storybook/react'
import { handlers } from '../../../../mocks/handler'
import { rest } from 'msw'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const meta: Meta<typeof LoginForm> = {
  title: 'organisms/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LoginForm>

export const Success: Story = {
  name: 'フォームに正しい値を入植し、ログインできた場合',
  render: (_) => {
    return (
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    )
  },
  parameters: {
    msw: {
      handlers,
    },
  },
}

export const Error: Story = {
  ...Success,
  name: 'フォームに間違えた値を入力し、ログインできない場合',
  parameters: {
    msw: {
      handlers: [
        ...handlers,
        rest.post('/login', (_, res, ctx) =>
          res(ctx.status(401), ctx.json({ success: false }))
        ),
      ],
    },
  },
}
