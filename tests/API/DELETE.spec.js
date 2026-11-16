import { test, expect } from '@playwright/test';
import bookingPayload from '../../test-data/API/createbooking.json';

test.describe('Delete Booking', () => {

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
        //console.log(bookingId);
    });

    test('Delete - Delete from a recently added booking', async ({ request }) => {
        const deleteResponse = await request.delete('/booking/' + bookingId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            }
        });
        expect(deleteResponse.status()).toBe(201);
        const getResponse = await request.get(`/booking/${bookingId}`, {
            headers: { 'Accept': 'application/json' }
        });
        expect(getResponse.status()).toBe(404);
    });

    test('Delete - Delete a booking without authorization', async ({ request }) => {
        const response = await request.delete('/booking/' + bookingId, {
            headers: { 'Content-Type': 'application/json' }
        });
        expect(response.status()).toBe(403);
    });

    test('Delete - Delete a non-existnt booking', async ({ request }) => {
        const response = await request.delete(`/booking/xxxxxxx`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            }
        });
        expect(response.status()).toBe(405);
    });

});
