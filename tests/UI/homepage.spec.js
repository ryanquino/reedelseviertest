// @ts-check
import { test, expect } from '@playwright/test';
import BasePage from '../../pages/base.page';
import homepageData from '../../test-data/UI/homepage.json';

test.describe('Cheapflights - Logo Validation', () => {
  /**
   * @type {BasePage}
   */
  let basePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.navigateToHomepage();
  });


  test('[TC-01] Navigate to page homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(homepageData.title);
  });

  test('[TC-02] Verify logo is displayed', async ({ page }) => {
    await expect(basePage.getLogo()).toBe;
  });
  

})

test.describe('Cheapflights - Login Button Validation', () => {
  /**
   * @type {BasePage}
   */
  let basePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.navigateToHomepage();
  });


  test('[TC-03] Verify login button is displayed', async ({ page }) => {
    await expect(basePage.getLoginButton()).toBeVisible();
  });

  test('[TC-04] Verify login button is clickable', async ({ page }) => {
    await expect(basePage.getLoginButton()).toBeEnabled();
  });
  

})
