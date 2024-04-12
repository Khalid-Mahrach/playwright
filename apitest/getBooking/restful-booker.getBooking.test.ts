import { expect, test } from "playwright/test";
import bookingData = require("../../test-data/booking.json");

test.beforeEach("Create Booking", async ({ request, baseURL }) => {
  const response = await request.post(`${process.env.BASEURL}/booking`, {
    data: bookingData,
  });
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();
  process.env.BOOKING_ID_3 = responseBody.bookingid;
});

test("Get Booking By Lastname @get", async ({ request, baseURL }) => {
  const response = await request.get(`${process.env.BASEURL}/booking`, {
    params: {
      lastname: "Brown",
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  
  let responseAsString = await response.body().then((b) => {
    let data = JSON.parse(b.toString());
    console.log("data"+data[0].bookingid);

    return data.filter(
      (d: { bookingid: string | undefined }) =>
        d.bookingid == process.env.BOOKING_ID_3
    );
  });

  let ID = process.env.BOOKING_ID_3;
  const a = ID;

  expect(responseAsString[0] !== undefined).toBe(true);

  if (a) {
    expect(responseAsString[0]).toHaveProperty("bookingid", +a);
  }
});

test("Get Booking By Firstname @get", async ({ request, baseURL }) => {
  const response = await request.get(`${process.env.BASEURL}/booking`, {
    params: {
      firstname: "Sally",
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  let responseAsString = await response.body().then((b) => {
    let data = JSON.parse(b.toString());
    return data.filter(
      (d: { bookingid: string | undefined }) =>
        d.bookingid == process.env.BOOKING_ID_3
    );
  });

  let ID = process.env.BOOKING_ID_3;
  const a = ID;

  expect(responseAsString[0] !== undefined).toBe(true);

  if (a) {
    expect(responseAsString[0]).toHaveProperty("bookingid", +a);
  }
});

/* test("Get Booking By Checkin Date @get", async ({ request, baseURL }) => {
  const response = await request.get(`${process.env.BASEURL}/booking`, {
    params: {
      checkin: "2023-10-10",
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  let responseAsString = await response.body().then((b) => {
    let data = JSON.parse(b.toString());
    return data.filter(
      (d: { bookingid: string | undefined }) =>
        d.bookingid == process.env.BOOKING_ID_3
    );
  });

  let ID = process.env.BOOKING_ID_3;
  const a = ID;

  expect(responseAsString[0] !== undefined).toBe(true);

  if (responseAsString[0] !== undefined && a) {
    expect(responseAsString[0]).toHaveProperty("bookingid", +a);
  }
}); */

test("Get Booking By Checkout Date @get", async ({ request, baseURL }) => {
  const response = await request.get(`${process.env.BASEURL}/booking`, {
    params: {
      checkout: "2014-10-23",
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  let responseAsString = await response.body().then((b) => {
    let data = JSON.parse(b.toString());
    return data.filter(
      (d: { bookingid: string | undefined }) =>
        d.bookingid == process.env.BOOKING_ID_3
    );
  });

  let ID = process.env.BOOKING_ID_3;
  const a = ID;

  expect(responseAsString[0] !== undefined).toBe(true);

  if (a) {
    expect(responseAsString[0]).toHaveProperty("bookingid", +a);
  }
});

test("Get Booking By ID @get", async ({ request, baseURL }) => {
  let ID = process.env.BOOKING_ID_3;
  const url = `${process.env.BASEURL}/booking/`;
  const response = await request.get(url + ID, {});
  const responseBody = await response.json();
console.log(responseBody);
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  expect(responseBody).toHaveProperty("firstname", bookingData.firstname);
  expect(responseBody).toHaveProperty("lastname", bookingData.lastname);
  expect(responseBody).toHaveProperty("totalprice", bookingData.totalprice);
  expect(responseBody).toHaveProperty("depositpaid", bookingData.depositpaid);
  console.log("test"+responseBody); // Logging the parsed response

  // If you still want to log the first element of the array (though it seems unnecessary in this context):
  console.log(Array.isArray(responseBody) && responseBody.length > 0 ? responseBody[1] : "Response is not an array or is empty");
  console.debug("test2");


});
