import { test, expect } from '@playwright/test';
import bookingPayload from '../../test-data/API/createbooking.json';

test.describe('Get Booking', () => {

    let bookingId;

    test.beforeEach(async ({ request }) => {
        const response = await request.post('/booking', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: bookingPayload
        });
        const body = await response.json();
        bookingId = body.bookingid;
        console.log(bookingId);
    });

    test('Get - Retrieve an existing booking from the newly created booking', async ({ request }) => {
        const response = await request.get('/booking/' +bookingId, {
            headers: { 'Accept': 'application/json' }
        });
        const body = await response.json();
        //console.log("booking id " + body.bookingId);
        expect(response.status()).toBe(200);
        expect(body.firstname).toBe(bookingPayload.firstname);
        expect(body.lastname).toBe(bookingPayload.lastname);
        expect(body.totalprice).toBe(bookingPayload.totalprice);
        expect(body.depositpaid).toBe(bookingPayload.depositpaid);
        expect(body.bookingdates.checkin).toBe(bookingPayload.bookingdates.checkin);
        expect(body.bookingdates.checkout).toBe(bookingPayload.bookingdates.checkout);
        expect(body.additionalneeds).toBe(bookingPayload.additionalneeds);
    });

    test('Get - Retrieve a non-existent booking', async ({ request }) => {
        const response = await request.get('/booking/xxxxxxx', {
            headers: { 'Accept': 'application/json' }
        });
        expect(response.status()).toBe(404);
    });

});
