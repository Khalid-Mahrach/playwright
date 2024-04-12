import { expect, test } from "playwright/test";

test("@smoke - Service HealthCheck", async ({ request, baseURL }) => {
  const response = await request.get(`${process.env.BASEURL}/ping`);
  expect(response.status()).toBe(201);
  expect(response.ok()).toBeTruthy();
});
