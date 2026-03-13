import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');

    // Check page loads without errors
    await expect(page).toHaveTitle(/SeaReady/i);
  });

  test('should have hero section with main tagline', async ({ page }) => {
    await page.goto('/');

    // Check for main headline
    const heroHeading = page.getByRole('heading', {
      name: /Maritime Compliance Solutions Built by Mariners/i
    });
    await expect(heroHeading).toBeVisible();
  });

  test('should have WBC3 urgency banner', async ({ page }) => {
    await page.goto('/');

    // Check for WBC3 deadline messaging in the amber banner specifically
    const wbc3Banner = page.getByText(/UK Workboat Operators: WBC3 Compliance Deadline/i).first();
    await expect(wbc3Banner).toBeVisible();
  });

  test('should have three pillars section', async ({ page }) => {
    await page.goto('/');

    // Check for Software pillar
    const softwarePillar = page.getByText(/Software/i).first();
    await expect(softwarePillar).toBeVisible();

    // Check for Services pillar
    const servicesPillar = page.getByText(/Services/i).first();
    await expect(servicesPillar).toBeVisible();

    // Check for Training pillar
    const trainingPillar = page.getByText(/Training/i).first();
    await expect(trainingPillar).toBeVisible();
  });

  test('should have primary CTAs', async ({ page }) => {
    await page.goto('/');

    // Check for quote CTA (Services)
    const quoteCTA = page.getByRole('link', { name: /Get SMS Quote|Request Quote/i }).first();
    await expect(quoteCTA).toBeVisible();

    // Check for waitlist CTA (Software)
    const waitlistCTA = page.getByRole('link', { name: /Join.*Waitlist/i }).first();
    await expect(waitlistCTA).toBeVisible();
  });

  test('should have navigation menu', async ({ page }) => {
    await page.goto('/');

    // Check for main nav
    const nav = page.getByRole('navigation').first();
    await expect(nav).toBeVisible();
  });
});
