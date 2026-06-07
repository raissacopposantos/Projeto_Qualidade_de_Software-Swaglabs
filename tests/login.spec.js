const { test, expect } = require('@playwright/test');

test('CT01 - Login com credenciais válidas', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory/);
});

test('CT02 - Login com senha inválida', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('senha_errada');
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
});

test('CT03 - Login com usuário inválido', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('error_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
});

test('CT04 - Login com campos vazios', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
});

test('CT05 - Login com usuário bloqueado', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('locked_out_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out');
});