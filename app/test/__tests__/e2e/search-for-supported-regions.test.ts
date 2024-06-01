import { test, expect } from '@playwright/test'
import { env } from '@/src/env/server'

test.beforeEach(async ({ page }) => {
  await page.goto(env.FRONTEND_SERVER_URL)
})

test.describe('Search for supported regions', () => {
  test('should allow to me to display region search page', async ({ page }) => {
    await page.getByRole('button', { name: '診断する' }).click()
    await expect(page.getByText('市町区村を選択してください')).toHaveText(
      '市町区村を選択してください',
    )
  })
  test('display results show the municipalities that depend on the prefecture', async ({
    page,
  }) => {
    await page.getByRole('button', { name: '診断する' }).click()
    await page.getByLabel('Open').nth(1).click()
    await page.getByRole('option', { name: '千葉県' }).click()
    await page.getByLabel('Open').nth(2).click()
    await page.getByRole('option', { name: '市川市' }).click()
    await page.getByRole('button', { name: '市川市 市川市' }).click()
    // 「市川市」が地域一覧に表示されていることを確認
    await expect(page.getByText('市川市')).toBeVisible()
  })
})
