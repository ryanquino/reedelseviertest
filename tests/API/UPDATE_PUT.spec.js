import { test, expect } from '@playwright/test';
import updatedPayload from '../../test-data/API/updatebooking.json';
import bookingPayload from '../../test-data/API/createbooking.json';

test.describe('Update Booking', () => {

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
    });

    test('Put - Update an existing booking', async ({ request }) => {
        const response = await request.put('/booking/'+ bookingId, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            },
            data: updatedPayload
        });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.firstname).toBe(updatedPayload.firstname);
        expect(body.lastname).toBe(updatedPayload.lastname);
        expect(body.totalprice).toBe(updatedPayload.totalprice);
        expect(body.depositpaid).toBe(updatedPayload.depositpaid);
        expect(body.bookingdates.checkin).toBe(updatedPayload.bookingdates.checkin);
        expect(body.bookingdates.checkout).toBe(updatedPayload.bookingdates.checkout);
        expect(body.additionalneeds).toBe(updatedPayload.additionalneeds);
    });

    test('Put - Update a booking without authorization', async ({ request }) => {
        const response = await request.put('/booking/'+bookingId, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: updatedPayload
        });
        expect(response.status()).toBe(403);
    });

    test('Put - Update a non-existent booking', async ({ request }) => {
        const response = await request.put('/booking/xxxxxxx', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            },
            data: updatedPayload
        });
        expect(response.status()).toBe(405);
    });

});