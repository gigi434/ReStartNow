import { LoginForm } from '../../index'
import type { Meta, StoryObj } from '@storybook/react'
import { handlers } from '../../../../mocks/handler'
import { rest } from 'msw'
import { QueryClient, QueryClientProvider } from 'react-query'
import store from '../../../../store'
import { Provider } from 'react-redux'

const queryClient = new QueryClient()

const meta: Meta<typeof LoginForm> = {
  title: 'organisms/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </Provider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof LoginForm>

const Template: Story = {
  parameters: {
    msw: {
      handlers,
    },
  },
}
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
