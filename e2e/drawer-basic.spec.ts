import { expect, test } from '@playwright/test';

test.describe('Basic Drawer Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders playground page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Drawer Labs Playground' })).toBeVisible();
  });

  test('opens drawer when trigger is clicked', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Open Basic Drawer' });
    await trigger.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('data-state', 'open');
  });

  test('shows drawer content when open', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Basic Drawer' }).click();

    await expect(page.getByRole('heading', { name: 'Basic Drawer' })).toBeVisible();
    await expect(page.getByText('This is a basic drawer component.')).toBeVisible();
  });

  test('closes drawer when close button is clicked', async ({ page }) => {
    // Open drawer
    await page.getByRole('button', { name: 'Open Basic Drawer' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('data-state', 'open');

    // Close drawer
    await page.getByRole('button', { name: 'Close' }).first().click();

    // Wait for animation
    await page.waitForTimeout(300);
    await expect(dialog).toHaveAttribute('data-state', 'closed');
  });

  test('closes drawer when overlay is clicked (dismissible)', async ({ page }) => {
    // Open drawer
    await page.getByRole('button', { name: 'Open Basic Drawer' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('data-state', 'open');

    // Click overlay
    const overlay = page.locator('.overlay').first();
    await overlay.click({ position: { x: 10, y: 10 } });

    // Wait for animation
    await page.waitForTimeout(300);
    await expect(dialog).toHaveAttribute('data-state', 'closed');
  });

  test('does not close non-dismissible drawer when overlay is clicked', async ({ page }) => {
    // Open non-dismissible drawer
    await page.getByRole('button', { name: 'Open Non-Dismissible Drawer' }).click();
    const dialog = page.getByRole('dialog').nth(3);
    await expect(dialog).toHaveAttribute('data-state', 'open');

    // Click overlay
    const overlay = page.locator('.overlay').nth(3);
    await overlay.click({ position: { x: 10, y: 10 } });

    // Should still be open
    await page.waitForTimeout(300);
    await expect(dialog).toHaveAttribute('data-state', 'open');
  });

  test('controlled drawer state works correctly', async ({ page }) => {
    // Open using internal button
    await page.getByRole('button', { name: 'Open Controlled Drawer' }).click();
    const dialog = page.getByRole('dialog').nth(1);
    await expect(dialog).toHaveAttribute('data-state', 'open');
    await expect(page.getByText('State: Open')).toBeVisible();

    // Close from inside
    await page.getByRole('button', { name: 'Close from Inside' }).click();
    await page.waitForTimeout(300);
    await expect(dialog).toHaveAttribute('data-state', 'closed');

    // Open from outside
    await page.getByRole('button', { name: 'Open from Outside' }).click();
    await expect(dialog).toHaveAttribute('data-state', 'open');
    await expect(page.getByText('State: Open')).toBeVisible();
  });
});
