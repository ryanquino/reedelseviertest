import {test, expect} from '@playwright/test';
import BasePage from '../../pages/base.page';
import SearchResultsPage from '../../pages/searchresults.page';
import searchResultsData from '../../test-data/UI/searchresults.json';


test.describe('Cheapflights - Search Results Page Validation', () => {
    /**
     * @type {BasePage}
     */
    let searchResultsPage;       

    test.beforeEach(async ({ page }) => {
        searchResultsPage = new SearchResultsPage(page);
        await searchResultsPage.navigateToHomepage();
    })

    test('[TC-01] Search for a one-way flight', async ({ page }) => {
        const resultPage = await searchResultsPage.searchOneWayFlight(searchResultsData.oneWayTrip);
        const results = searchResultsPage.getResultList(resultPage);
        await expect(results.first()).toBeVisible({ timeout: 15000 });
        const count = await results.count();
        expect(count).toBeGreaterThan(0);
    })

    test('[TC-02] Search for a return flight', async ({ page }) => {
        const resultPage = await searchResultsPage.searchReturnFlight(searchResultsData.returnTrip);
        const results = searchResultsPage.getResultList(resultPage);
        await expect(results.first()).toBeVisible({ timeout: 15000 });
        const count = await results.count();
        expect(count).toBeGreaterThan(0);
    })

    test('[TC-03] Search for a multi-city flight', async ({ page }) => {
        const resultPage = await searchResultsPage.searchMultiCityFlight(searchResultsData.multiCityTrip);
        const results = searchResultsPage.getResultList(resultPage);
        await expect(results.first()).toBeVisible({ timeout: 15000 });
        const count = await results.count();
        expect(count).toBeGreaterThan(0);
    })
})

test.describe('Cheapflights - Negative tests', () => {
    /**
     * @type {BasePage}
     */
    let searchResultsPage;       

    test.beforeEach(async ({ page }) => {
        searchResultsPage = new SearchResultsPage(page);
        await searchResultsPage.navigateToHomepage();
    })

    test('[TC-04] Search without a destination', async ({ page }) => {
        await searchResultsPage.searchWithoutDestination(searchRezsultsData.returnTrip);
        const results = searchResultsPage.getErrorMessage('destination');
        await expect(results).toBeVisible({ timeout: 10000 });
    })

    test('[TC-05] Search without a departure and return date', async ({ page }) => {
        await searchResultsPage.searchWithoutDepartureAndReturnDate(searchResultsData.returnTrip);
        const departureDate = searchResultsPage.getErrorMessage('departureDate');
         await expect(departureDate).toBeVisible({ timeout: 10000 });
        const returnDate = searchResultsPage.getErrorMessage('returnDate');
        await expect(returnDate).toBeVisible({ timeout: 10000 });
    })

    test('[TC-06] Search without origin', async ({ page }) => {
        const origin = await searchResultsPage.searchWithoutOrigin(searchResultsData.returnTrip);
        await expect(origin).toBeFocused();
    })

    test.only('[TC-07] Search with same origin and destination', async ({ page }) => {
        await searchResultsPage.searchSameOriginAndDestination(searchResultsData.returnTrip);
        const results = searchResultsPage.getErrorMessage('sameOriginAndDestination');
        await expect(results).toBeVisible({ timeout: 10000 });
    })

})