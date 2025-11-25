import { test, expect } from "@playwright/test";

test("ConsoleLayout loads correctly", async ({ page }) => {
  await page.goto("/");

  // Header
  await expect(page.locator("header")).toBeVisible();

  // Sidebar nav
  await expect(page.locator("nav")).toBeVisible();

  // ContentArea
  await expect(page.locator("main")).toBeVisible();
});
