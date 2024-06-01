import { test, expect } from '@playwright/test'
import { env } from '@/src/env/server'

test.beforeEach(async ({ page }) => {
  await page.goto(env.FRONTEND_SERVER_URL)
})

test.describe('Answer the Questions', () => {
  test('should allow to me to display results', async ({ page }) => {
    await page.getByRole('button', { name: '診断する' }).click()
    await page.getByLabel('都道府県').click()
    await page.getByRole('option', { name: '千葉県' }).click()
    await page.getByLabel('市区町村').click()
    await page.getByRole('option', { name: '市川市' }).click()
    await page.getByRole('button', { name: '市川市 市川市' }).click()
    await page
      .getByRole('checkbox', {
        name: '出産・子育て応援給付金 保健センター健康支援課 複合 最大',
      })
      .click()
    await page.getByLabel('はい').check()
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByLabel('いいえ').check()
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByLabel('いいえ').check()
    await page.getByRole('button', { name: 'Submit' }).click()
    await expect(
      page.getByText(
        '受給できそうな金額： ￥100,000質問作成の参照先: https://www.test.com',
      ),
    ).toHaveText(
      '受給できそうな金額： ￥100,000質問作成の参照先: https://www.test.com',
    )
  })
})
