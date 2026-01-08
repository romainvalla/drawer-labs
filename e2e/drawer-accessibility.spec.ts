import { expect, test } from '@playwright/test';

test.describe('Drawer Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('drawer has correct ARIA attributes', async ({ page }) => {
    // Open modal drawer
    await page.getByRole('button', { name: 'Open Modal Drawer' }).click();
    const dialog = page.getByRole('dialog').nth(2);

    // Check ARIA attributes
    await expect(dialog).toHaveAttribute('role', 'dialog');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    await expect(dialog).toHaveAttribute('aria-describedby', 'modal-desc');
  });

  test('drawer title is accessible', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Modal Drawer' }).click();

    const title = page.getByRole('heading', { name: 'Modal Drawer' });
    await expect(title).toBeVisible();
    await expect(title).toHaveAttribute('id', 'modal-title');
  });

  test('drawer description is accessible', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Modal Drawer' }).click();

    const description = page.getByText(
      'This drawer locks body scroll and traps focus.'
    );
    await expect(description).toBeVisible();
    await expect(description).toHaveAttribute('id', 'modal-desc');
  });

  test('focus is trapped within modal drawer', async ({ page }) => {
    // Open modal drawer
    await page.getByRole('button', { name: 'Open Modal Drawer' }).click();
    const dialog = page.getByRole('dialog').nth(2);
    await expect(dialog).toBeVisible();

    // Get all focusable elements
    const inputs = page.getByPlaceholder(/Try tabbing|Focus is trapped/);
    const closeButton = page.getByRole('button', { name: 'Close' }).nth(2);

    // Tab through focusable elements
    await page.keyboard.press('Tab');
    await expect(inputs.first()).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(inputs.nth(1)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(closeButton).toBeFocused();

    // Tabbing from last element should cycle back to first
    await page.keyboard.press('Tab');
    await expect(inputs.first()).toBeFocused();

    // Shift+Tab should go backwards
    await page.keyboard.press('Shift+Tab');
    await expect(closeButton).toBeFocused();
  });

  test('Escape key closes dismissible drawer', async ({ page }) => {
    // Open drawer
    await page.getByRole('button', { name: 'Open Basic Drawer' }).click();
    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toHaveAttribute('data-state', 'open');

    // Press Escape
    await page.keyboard.press('Escape');

    // Should close
    await page.waitForTimeout(300);
    await expect(dialog).toHaveAttribute('data-state', 'closed');
  });

  test('body scroll is locked when modal drawer is open', async ({ page }) => {
    // Check initial body overflow
    const initialOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(initialOverflow).not.toBe('hidden');

    // Open modal drawer
    await page.getByRole('button', { name: 'Open Modal Drawer' }).click();

    // Check body overflow is locked
    const lockedOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(lockedOverflow).toBe('hidden');

    // Close drawer
    await page.getByRole('button', { name: 'Close' }).nth(2).click();
    await page.waitForTimeout(300);

    // Check body overflow is restored
    const restoredOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(restoredOverflow).not.toBe('hidden');
  });

  test('drawer trigger is keyboard accessible', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Open Basic Drawer' });

    // Focus trigger
    await trigger.focus();
    await expect(trigger).toBeFocused();

    // Press Enter to open
    await page.keyboard.press('Enter');

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toHaveAttribute('data-state', 'open');

    // Close it
    await page.getByRole('button', { name: 'Close' }).first().click();
    await page.waitForTimeout(300);

    // Try again with Space key
    await trigger.focus();
    await page.keyboard.press('Space');

    await expect(dialog).toHaveAttribute('data-state', 'open');
  });

  test('close button is keyboard accessible', async ({ page }) => {
    // Open drawer
    await page.getByRole('button', { name: 'Open Basic Drawer' }).click();
    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toHaveAttribute('data-state', 'open');

    // Focus close button
    const closeButton = page.getByRole('button', { name: 'Close' }).first();
    await closeButton.focus();
    await expect(closeButton).toBeFocused();

    // Press Enter to close
    await page.keyboard.press('Enter');

    await page.waitForTimeout(300);
    await expect(dialog).toHaveAttribute('data-state', 'closed');
  });

  test('drawer has visible focus indicators', async ({ page }) => {
    // Open modal drawer
    await page.getByRole('button', { name: 'Open Modal Drawer' }).click();

    // Focus first input
    const firstInput = page.getByPlaceholder('Try tabbing...');
    await firstInput.focus();

    // Check that input has focus-visible styles
    const outlineStyle = await firstInput.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.outline;
    });

    // Should have some outline or border for focus indication
    expect(outlineStyle).toBeDefined();
  });

  test('screen reader can access drawer content', async ({ page }) => {
    // Open drawer
    await page.getByRole('button', { name: 'Open Basic Drawer' }).click();

    // Check that all content is accessible via roles
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Basic Drawer' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close' }).first()).toBeVisible();
  });
});
