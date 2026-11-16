import {test, expect} from '@playwright/test';
import ResultsPage from '../../pages/resultspage.page';
import SearchResultsPage from '../../pages/searchresults.page';
import resultsData from '../../test-data/UI/resultspage.json';


test.describe('Cheapflights - Search Page Validation', () => {
    /**
     * @type {BasePage}
     */
    let resultsPage;       

    test.beforeEach(async ({ page }) => {
        resultsPage = new ResultsPage(page);
    })

    test('[TC-05] Verify search results are displayed', async ({ page }) => {
        const searchResultsPage = new SearchResultsPage(page);
        await resultsPage.navigeteToSearchResultsPage(resultsData);
        const resultList = searchResultsPage.getResultList();
        await expect(resultList.first()).toBeVisible({ timeout: 10000 });
        const count = await resultList.count();
        expect(count).toBeGreaterThan(0);
    })

    test('[TC-06] Verify flight details are displayed', async ({ page }) => {
        await resultsPage.navigeteToSearchResultsPage(resultsData);
        // DVO - MNL
        const departureFlight = resultsPage.getFlightDetails();
        await expect(departureFlight.first()).toBeVisible({ timeout: 10000 });
        await expect(resultsPage.getFlightTime(departureFlight.first())).toBeVisible();
        await expect(resultsPage.getFlighttype(departureFlight.first())).toBeVisible();
        await expect(resultsPage.getFlightDuration(departureFlight.first())).toBeVisible();
        await expect(resultsPage.getAirlineLogo(departureFlight.first())).toBeVisible();
        // MNL - DVO
        const returnFlight = resultsPage.getFlightDetails();
        await expect(returnFlight.first()).toBeVisible({ timeout: 10000 });
        await expect(resultsPage.getFlightTime(returnFlight.first())).toBeVisible();
        await expect(resultsPage.getFlighttype(returnFlight.first())).toBeVisible();
        await expect(resultsPage.getFlightDuration(returnFlight.first())).toBeVisible();
        await expect(resultsPage.getAirlineLogo(returnFlight.first())).toBeVisible();
    })

    test('[TC-07] Verify price section is displayed', async ({ page }) => {
        await resultsPage.navigeteToSearchResultsPage(resultsData);
        const priceSection = resultsPage.getPriceSection();
        await expect(priceSection.first()).toBeVisible({ timeout: 10000 });
        await expect(resultsPage.getFlightPrice(priceSection.first())).toBeVisible();
        await expect(resultsPage.getFlightcabinClass(priceSection.first())).toBeVisible();
        await expect(resultsPage.getFlightProvider(priceSection.first())).toBeVisible();
        await expect(resultsPage.getViewDealButton(priceSection.first())).toBeVisible();

    })

    test('[TC-08] Verify results are sorted by cheapest', async ({ page }) => {
        await resultsPage.navigeteToSearchResultsPage(resultsData);
        await resultsPage.sortByCheapest();
        const prices = await resultsPage.getPriceList();
        expect(prices.length).toBeGreaterThan(0);
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
    })

    // test('[TC-09] Verify results are sorted by quickets', async ({ page }) => {
    //     await resultsPage.navigeteToSearchResultsPage(resultsData);
    //     await resultsPage.sortByQuickest();
    // })

    test('[TC-09] Verify flight details element position', async ({ page }) => {
        await resultsPage.navigeteToSearchResultsPage(resultsData);
        const departureFlight = resultsPage.getFlightDetails();
        const logoBox = await resultsPage.getAirlineLogo(departureFlight.first()).boundingBox();
        const timeBox = await resultsPage.getFlightTime(departureFlight.first()).boundingBox();
        const typeBox = await resultsPage.getFlighttype(departureFlight.first()).boundingBox();
        const durationBox = await resultsPage.getFlightDuration(departureFlight.first()).boundingBox();
        const originBox = await resultsPage.getOriginCode(departureFlight.first()).boundingBox();
        const destinationBox = await resultsPage.getDestinationCode(departureFlight.first()).boundingBox();
        expect(logoBox.x).toBeLessThan(timeBox.x);
        expect(timeBox.x).toBeLessThan(typeBox.x);
        expect(typeBox.x).toBeLessThan(durationBox.x);
        expect(originBox.y).toBeGreaterThan(timeBox.y);
        expect(destinationBox.y).toBeGreaterThan(timeBox.y);
    })

    test('[TC-10] Verify price section elements position', async ({ page }) => {
        await resultsPage.navigeteToSearchResultsPage(resultsData);
        const priceSection = resultsPage.getPriceSection();
        await expect(priceSection.first()).toBeVisible({ timeout: 10000 });
        const priceBox = await resultsPage.getFlightPrice(priceSection.first()).boundingBox();
        const cabinClassBox = await resultsPage.getFlightcabinClass(priceSection.first()).boundingBox();
        const providerBox = await resultsPage.getFlightProvider(priceSection.first()).boundingBox();
        const viewDealBox = await resultsPage.getViewDealButton(priceSection.first()).boundingBox();
        expect(priceBox.y).toBeLessThan(cabinClassBox.y);
        expect(cabinClassBox.y).toBeLessThan(providerBox.y);
        expect(providerBox.y).toBeLessThan(viewDealBox.y);
    })
})

