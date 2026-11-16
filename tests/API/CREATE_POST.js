import { test, expect } from '@playwright/test';
import bookingPayload from '../../test-data/API/createbooking.json';

test.describe('Create Booking', () => {

    test('Post - Create a new bookng', async ({ request }) => {
        const response = await request.post('/booking', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: bookingPayload
        });

        const body = await response.json();
        //console.log("booking id " + body.bookingId);
        //expect(body.bookingid).not.toBe(null);
        expect(response.status()).toBe(200);
        expect(body.booking.firstname).toBe(bookingPayload.firstname);
        expect(body.booking.lastname).toBe(bookingPayload.lastname);
        expect(body.booking.totalprice).toBe(bookingPayload.totalprice);
        expect(body.booking.depositpaid).toBe(bookingPayload.depositpaid);
        expect(body.booking.bookingdates.checkin).toBe(bookingPayload.bookingdates.checkin);
        expect(body.booking.bookingdates.checkout).toBe(bookingPayload.bookingdates.checkout);
        expect(body.booking.additionalneeds).toBe(bookingPayload.additionalneeds);
    });

    test('Post - Create a booking with missing required fields', async ({ request }) => {
        const response = await request.post('/booking', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                firstname: 'Reed'
            }
        });

        expect(response.status()).toBe(500);
    });

    test('Poszt - Create a booking with invalid date format', async ({ request }) => {
        const response = await request.post('/booking', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                bookingdates: {
                    checkin: 'invalid-date',
                    checkout: 'invalid-date'
                }
            }
        });

        expect(response.status()).toBe(500);
    });
})