import { test } from "@playwright/test";

test("toggle theme", async ({ page }) => {
  await page.goto("localhost:3000");

  await page.getByRole("button", { name: "ThemeToggle" }).click();
});
