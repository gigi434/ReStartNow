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
  /* テスト用のヘルパー関数）を導入するとStorybookのビルドが失敗する。
  https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
  そのため、ワークアラウンドとして下記設定を導入する
  https://github.com/vercel/next.js/issues/55620#issuecomment-1758276652
  Storybookのビルド時にはワーニングが出るが、支障はない
  WARN export 'render' (imported as 'render') was not found in '@testing-library/react' (possible exports: buildQueries, configure, ...
  */
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = config.resolve.alias || {}
    config.resolve.alias['@testing-library/react'] =
      '@storybook/testing-library'
    return config
  },
}
export default config
