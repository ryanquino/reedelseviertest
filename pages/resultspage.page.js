import BasePage from './base.page';

class ResultsPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.cheapestSortButton = this.page.getByRole('button', { name: 'Cheapest' });
        //this.quickestSortButton = this.page.getByRole('button', { name: 'Quickest' });
        this.priceList = this.page.locator('.e2GB-price-text');
        this.resultCards = this.page.locator('[aria-label^="Result item"]');
    }

    buildSearchUrl(details) {
        return `${this.BASE_URL}/flight-search/${details.from}-${details.to}/${details.departureDate}/${details.returnDate}/${details.adults}adults/children-${details.children}L${details.childAge}?sort=bestflight_a`;
    }

    async navigeteToSearchResultsPage(details) {
        await this.page.goto(this.buildSearchUrl(details));
    }

    // getResultCard() {
    //     return this.resultCards.first() ;
    // }

    getFlightDetails() {
        return this.resultCards.first().locator('li.hJSA-item');
    }

    getPriceSection() {
        return this.resultCards.first().locator('.nrc6-price-section');
    }

    getFlightTime(flightRow) {
        return flightRow.locator('.vmXl-mod-variant-large');
    }

    getFlighttype(flightRow) {
        return flightRow.locator('.JWEO .vmXl-mod-variant-default');
    }

    getFlightDuration(flightRow) {
        return flightRow.locator('.xdW8 .vmXl');
    }

    getAirlineLogo(flightRow) {
        return flightRow.locator('.c5iUd-leg-carrier img');
    }

    getFlightPrice(flightRow) {
        return flightRow.locator('.e2GB-price-text');
    }

    getFlightcabinClass(flightRow) {
        return flightRow.locator('.Hy6H');
    }

    getFlightProvider(flightRow) {
        return flightRow.locator('.M_JD-provider-name');
    }

    getViewDealButton(flightRow) {
        return flightRow.locator('button.RxNS');
    }

    getOriginCode(flightRow) {
        return flightRow.locator('.c_cgF-mod-variant-full-airport-wide').first();
    }

    getDestinationCode(flightRow) {
        return flightRow.locator('.c_cgF-mod-variant-full-airport-wide').nth(1);
    }

    async sortByCheapest() {
        await this.cheapestSortButton.click({ force: true });
        await this.page.waitForSelector('[aria-label="Cheapest"][aria-selected="true"]', { timeout: 7000 });
        await this.page.waitForTimeout(3000);
    }

    async getPriceList() {
        const prices = await this.priceList.allTextContents();
        return prices.map(p => parseInt(p.replace(/[^0-9]/g, '')));
    }

    // async sortByQuickest() {
    //     await this.quickestSortButton.click({ force: true });
    //     await this.page.waitForSelector('[aria-label="Quickest"][aria-selected="true"]', { timeout: 7000 });
    //     await this.page.waitForTimeout(3000);
    // }

    async getDurationList(){
        const prices = await this.priceList.getFlightDuration();
    }
}

module.exports = ResultsPage;
