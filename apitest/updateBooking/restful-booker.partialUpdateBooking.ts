import { expect, test } from "playwright/test";
import bookingData = require("../../test-data/update-booking.json");

test.beforeEach("Create Booking", async ({ request, baseURL }) => {
  const response = await request.post(`${process.env.BASEURL}/booking`, {
    data: bookingData,
  });
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();
  process.env.BOOKING_ID_5 = responseBody.bookingid;
});

test("Update Booking Partially - Udpate firstname and lastname @patch", async ({ request, baseURL }) => {
  let ID = process.env.BOOKING_ID_5;
  const url = `${process.env.BASEURL}/booking/`;
  const response2 = await request.get(url + ID, {});
  expect(response2.status()).toBe(200);

  const response = await request.put(url + ID, {
    headers: {
      Cookie: `token=${process.env.TOKEN}`,
      Accept: "application/json",
    },
    data: {
      firstname: "James",
      lastname: "Brown",
    },
  });
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();

  console.log(responseBody);
  expect(responseBody).toHaveProperty("firstname", "James");
  expect(responseBody).toHaveProperty("lastname", "Brown");
  expect(responseBody).toHaveProperty("totalprice", bookingData.totalprice);
  expect(responseBody).toHaveProperty("depositpaid", bookingData.depositpaid);
  expect(responseBody).toHaveProperty(
    "additionalneeds",
    bookingData.additionalneeds
  );
});
