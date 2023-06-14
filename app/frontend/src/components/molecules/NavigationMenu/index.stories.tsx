import { NavigationMenu, NavigationMenuProps } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof NavigationMenu> = {
  title: 'Molecules/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NavigationMenu>

const NavigationItems: NavigationMenuProps[] = [
  { href: '/results', content: '結果閲覧' },
  { href: '/information', content: 'お知らせ' },
  { href: '/profile', content: 'プロフィール' },
]

export const Default: Story = {
  args: { navItems: NavigationItems },
}
