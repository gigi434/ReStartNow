import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: [
    '../@(stories|src)/**/*.mdx',
    '../@(stories|src)/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-css-modules',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-styling',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
}
export default config
