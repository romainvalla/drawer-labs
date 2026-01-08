import { expect, test } from '@playwright/test';

test.describe('Drawer Gestures and Animations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('supports drag gesture to close drawer', async ({ page }) => {
    // Open drawer
    await page.getByRole('button', { name: 'Open Basic Drawer' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('data-state', 'open');

    // Get dialog bounding box
    const box = await dialog.boundingBox();
    if (!box) throw new Error('Dialog not found');

    // Drag down from handle area
    await page.mouse.move(box.x + box.width / 2, box.y + 20);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, box.y + 250, { steps: 10 });
    await page.mouse.up();

    // Should close after drag
    await page.waitForTimeout(500);
    await expect(dialog).toHaveAttribute('data-state', 'closed');
  });

  test('drawer follows pointer during drag', async ({ page }) => {
    // Open drawer
    await page.getByRole('button', { name: 'Open Basic Drawer' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('data-state', 'open');

    // Get dialog bounding box
    const box = await dialog.boundingBox();
    if (!box) throw new Error('Dialog not found');

    // Start dragging
    await page.mouse.move(box.x + box.width / 2, box.y + 20);
    await page.mouse.down();

    // Move a bit
    await page.mouse.move(box.x + box.width / 2, box.y + 100, { steps: 5 });

    // Check transform is applied
    const transform = await dialog.evaluate((el) => window.getComputedStyle(el).transform);
    expect(transform).not.toBe('none');

    // Release
    await page.mouse.up();
  });

  test('drawer snaps back if drag is insufficient', async ({ page }) => {
    // Open drawer
    await page.getByRole('button', { name: 'Open Basic Drawer' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('data-state', 'open');

    // Get dialog bounding box
    const box = await dialog.boundingBox();
    if (!box) throw new Error('Dialog not found');

    // Small drag (insufficient to close)
    await page.mouse.move(box.x + box.width / 2, box.y + 20);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, box.y + 50, { steps: 5 });
    await page.mouse.up();

    // Should stay open
    await page.waitForTimeout(500);
    await expect(dialog).toHaveAttribute('data-state', 'open');
  });

  test('supports different drawer directions', async ({ page }) => {
    // Test bottom drawer (default)
    await page.getByRole('button', { name: 'Open Basic Drawer' }).click();
    const bottomDrawer = page.getByRole('dialog').first();
    await expect(bottomDrawer).toHaveAttribute('data-direction', 'bottom');

    // Close it
    await page.getByRole('button', { name: 'Close' }).first().click();
    await page.waitForTimeout(300);

    // Test top drawer
    await page.getByRole('button', { name: 'Open from Top' }).click();
    const topDrawer = page.getByRole('dialog').nth(4);
    await expect(topDrawer).toHaveAttribute('data-direction', 'top');
    await expect(topDrawer).toHaveAttribute('data-state', 'open');

    // Close it
    await page.getByRole('button', { name: 'Close' }).nth(4).click();
    await page.waitForTimeout(300);

    // Test left drawer
    await page.getByRole('button', { name: 'Open from Left' }).click();
    const leftDrawer = page.getByRole('dialog').nth(5);
    await expect(leftDrawer).toHaveAttribute('data-direction', 'left');
    await expect(leftDrawer).toHaveAttribute('data-state', 'open');

    // Close it
    await page.getByRole('button', { name: 'Close' }).nth(5).click();
    await page.waitForTimeout(300);

    // Test right drawer
    await page.getByRole('button', { name: 'Open from Right' }).click();
    const rightDrawer = page.getByRole('dialog').nth(6);
    await expect(rightDrawer).toHaveAttribute('data-direction', 'right');
    await expect(rightDrawer).toHaveAttribute('data-state', 'open');
  });

  test('handles touch events on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');

    // Open drawer
    await page.getByRole('button', { name: 'Open Basic Drawer' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('data-state', 'open');

    // Get dialog bounding box
    const box = await dialog.boundingBox();
    if (!box) throw new Error('Dialog not found');

    // Touch drag down
    await page.touchscreen.tap(box.x + box.width / 2, box.y + 20);
    await page.waitForTimeout(100);

    // Swipe down
    const startY = box.y + 20;
    const endY = box.y + 250;
    const steps = 10;
    const stepSize = (endY - startY) / steps;

    for (let i = 0; i <= steps; i++) {
      await page.touchscreen.tap(box.x + box.width / 2, startY + stepSize * i);
      await page.waitForTimeout(10);
    }

    // Should close
    await page.waitForTimeout(500);
    await expect(dialog).toHaveAttribute('data-state', 'closed');
  });
});
