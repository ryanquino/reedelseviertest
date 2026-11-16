import { test, expect } from '@playwright/test';
import updatedPayload from '../../test-data/API/updatebooking.json';
import bookingPayload from '../../test-data/API/createbooking.json';

test.describe('PartialUpdateBooking', () => {

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

    test('Patch - Partial update firstname and lastname only', async ({ request }) => {
        const response = await request.patch('/booking/' + bookingId, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            },
            data: {
                firstname: updatedPayload.firstname,
                lastname: updatedPayload.lastname
            }
        });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.firstname).toBe(updatedPayload.firstname);
        expect(body.lastname).toBe(updatedPayload.lastname);
        expect(body.totalprice).toBe(bookingPayload.totalprice);
        expect(body.depositpaid).toBe(bookingPayload.depositpaid);
        expect(body.bookingdates.checkin).toBe(bookingPayload.bookingdates.checkin);
        expect(body.bookingdates.checkout).toBe(bookingPayload.bookingdates.checkout);
        expect(body.additionalneeds).toBe(bookingPayload.additionalneeds);
    });

    test('Patch - Partial update totalprice only', async ({ request }) => {
        const response = await request.patch('/booking/'+ bookingId, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            },
            data: { totalprice: updatedPayload.totalprice }
        });

        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.totalprice).toBe(updatedPayload.totalprice);
        expect(body.firstname).toBe(bookingPayload.firstname);
        expect(body.lastname).toBe(bookingPayload.lastname);
    });

    test('Patch - Partial update without authorization', async ({ request }) => {
        const response = await request.patch('/booking' +bookingId,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: { firstname: updatedPayload.firstname }
        });

        expect(response.status()).toBe(403);
    });

    test('Patch - Partial update on non-existent booking', async ({ request }) => {
        const response = await request.patch('/booking/xxxxxxx', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            },
            data: { firstname: updatedPayload.firstname }
        });
        expect(response.status()).toBe(405);
    });

});
