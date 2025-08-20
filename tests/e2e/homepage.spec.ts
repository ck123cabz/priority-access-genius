import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check that the page loads without errors
    await expect(page).toHaveTitle(/Create Next App/)
    
    // Check for basic content
    await expect(page.locator('main')).toBeVisible()
  })
})