import BasePage from './base.page';

class SearchResultsPage extends BasePage {
    static DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    static MONTHS = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];

    constructor(page) {
        super(page);
        this.searchResultsHeader = this.page.getByRole('heading', { name: 'Search Results' });

        

        this.tripTypeDropdown = this.page.getByRole('combobox', { name: 'Trip type Return' });
        this.oneWayOption = this.page.getByRole('option', { name: 'One-way' });
        this.returnOption = this.page.getByRole('option', { name: 'Return' });
        this.multiCityOption = this.page.getByRole('option', { name: 'Multi-city' });
        this.departureButton = this.page.getByRole('button', { name: 'Departure' });
        this.departureReturnButton = this.page.getByRole('button', { name: 'Departure - Return' });
        this.searchButton = this.page.getByRole('button', { name: 'Search', exact: true });
        this.originLocation = this.page.getByRole('combobox', { name: 'Origin location' });
        this.departureLocation = this.page.getByRole('combobox', { name: 'Ask anything' });
        this.originLocationMultiCity =  this.page.getByRole('combobox', { name: 'Origin location' });
        this.destinationLocationMultiCity =  this.page.getByRole('combobox', { name: 'Destination location' });
        this.adultIncrement = this.page.getByRole('button', { name: 'Increment' }).first();
        this.childrenIncrement = this.page.getByRole('button', { name: 'Increment' }).nth(1);
        this.childAge = this.page.getByRole('combobox', { name: 'Age Age' });
        this.infantIncrement = this.page.getByRole('button', { name: 'Increment' }).nth(2);
        this.clearAllButton = this.page.getByRole('button', { name: 'Reset the search form' });
        this.addAnotherFlightButton = this.page.getByRole('button', { name: 'Add another flight' });
        this.removeOrigin = this.page.locator('.DAZT-item-close');
    }

    dayLabel(iso) {
        const [y, m, d] = iso.split('-').map(Number);
        const dt = new Date(Date.UTC(y, m - 1, d));
        return `${SearchResultsPage.DAYS[dt.getUTCDay()]}, ${d} ${SearchResultsPage.MONTHS[m - 1]}, ${y}`;
    }

    buildSearchUrl(oneWayTrip) {
        const childSegment = oneWayTrip.childAge !== undefined && oneWayTrip.childAge !== null
            ? `/children-${oneWayTrip.childAge}`
            : '';

        return `${this.BASE_URL}/flight-search/${oneWayTrip.from}-${oneWayTrip.to}/${oneWayTrip.departureDate}/${oneWayTrip.adults}adults${childSegment}?sort=bestflight_a`;
    }

    async selectDate(scopeLabel, iso) {
        const label = SearchResultsPage.dayLabel(iso); 
        const day = this.page.locator(`[aria-label="${scopeLabel}"]`)
            .getByRole('button', { name: new RegExp('^' + label) });

        await day.first().click({ timeout: 10000 });
    }

    async searchOneWayFlight(oneWayTrip) {
        await this.tripTypeDropdown.click();
        await this.page.waitForSelector('text=One-way');
        await this.oneWayOption.click();
        await this.departureLocation.click();
        await this.departureLocation.fill(oneWayTrip.to);
        await this.page.getByRole('option', { name: new RegExp(oneWayTrip.to, 'i') }).first().click();
        await this.departureButton.click();
        await this.page.locator('[aria-label="Departure date"]').getByRole('button', { name: this.dayLabel(oneWayTrip.departureDate), exact: true }).click();
        await this.adultIncrement.click();
        // await this.childrenIncrement.click();
        // await this.childAge.waitForSelector( { state : 'visible' } );
        // await this.childAge.click();
        // await this.page.getByRole('listbox', { name: 'Age Age' }).getByRole('option', { name: oneWayTrip.childAge.toString(), exact: true }).click();
        // await this.infantIncrement.click();

        const newPagePromise = this.page.context().waitForEvent('page');
        await this.searchButton.click();
        const newPage = await newPagePromise;
        await newPage.waitForLoadState('domcontentloaded');
        return newPage;

    }

    async searchReturnFlight(returnTrip) {
        await this.tripTypeDropdown.click();
        await this.page.waitForSelector('text=Return');
        await this.returnOption.click();
        await this.departureLocation.click();
        await this.departureLocation.fill(returnTrip.to);
        await this.page.getByRole('option', { name: new RegExp(returnTrip.to, 'i') }).first().click();
        await this.departureReturnButton.click();
        await this.page.locator('[aria-label="Departure date"]').getByRole('button', { name: this.dayLabel(returnTrip.departureDate), exact: true }).click();
        await this.page.locator('[aria-label="Return date"]').getByRole('button', { name: this.dayLabel(returnTrip.returnDate), exact: true }).click();
        await this.adultIncrement.click();
        const newPagePromise = this.page.context().waitForEvent('page');
        await this.searchButton.click();
        const newPage = await newPagePromise;
        await newPage.waitForLoadState('domcontentloaded');
        return newPage;

    }

    async searchMultiCityFlight(multiCityTrip) {
        await this.tripTypeDropdown.click();
        await this.page.waitForSelector('text=Multi-city');
        await this.multiCityOption.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.clearAllButton.click();
        //await this.addAnotherFlightButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        const rows = await this.originLocationMultiCity.count();  
        for (let i = 1; i <= rows; i++) {
            const from = multiCityTrip[`from${i}`];
            const to = multiCityTrip[`to${i}`];
            await this.originLocationMultiCity.nth(i - 1).click();
            await this.originLocationMultiCity.nth(i - 1).fill(from);
            await this.page.getByRole('option').filter({ hasText: from }).first().click();
            await this.destinationLocationMultiCity.nth(i - 1).click();
            await this.destinationLocationMultiCity.nth(i - 1).fill(to);
            await this.page.getByRole('option').filter({ hasText: to }).first().click();
            await this.departureButton.nth(i - 1).click();
            await this.page.locator('[aria-label="Departure date"]').getByRole('button', {name: this.dayLabel(multiCityTrip[`departureDate${i}`]),exact: true}).click();
        }
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    getResultList(page = this.page) {
        return page.getByRole('group', { name: /^Result item/ });
    }

    async searchWithoutOrigin(returnTrip) {
        await this.originLocation.hover();
        await this.removeOrigin.click({force: true});
        await this.departureLocation.click();
        await this.departureLocation.fill(returnTrip.to);
        await this.page.getByRole('option', { name: new RegExp(returnTrip.to, 'i') }).first().click();
        await this.departureReturnButton.click();
        await this.page.locator('[aria-label="Departure date"]').getByRole('button', { name: this.dayLabel(returnTrip.departureDate), exact: true }).click();
        await this.page.locator('[aria-label="Return date"]').getByRole('button', { name: this.dayLabel(returnTrip.returnDate), exact: true }).click();
        await this.searchButton.click();

        return this.originLocation;
    }

    async searchWithoutDestination(returnTrip) {
        await this.departureReturnButton.click();
        await this.page.locator('[aria-label="Departure date"]').getByRole('button', { name: this.dayLabel(returnTrip.departureDate), exact: true }).click();
        await this.page.locator('[aria-label="Return date"]').getByRole('button', { name: this.dayLabel(returnTrip.returnDate), exact: true }).click();
        await this.departureLocation.click();
        await this.searchButton.click();
    }

    getErrorMessage(type) {
        const messages = {
            destination: 'Please enter a Destination airport.',
            departureDate: 'Please enter a Departure date.',
            returnDate: 'Please enter a Return date.',
            sameOriginAndDestination: /Please enter unique 'From' and 'To' airports for flight/i
        };
        return this.page.getByText(messages[type]);
    }

    async searchWithoutDepartureAndReturnDate(returnTrip) {
        await this.departureLocation.click();
        await this.departureLocation.fill(returnTrip.to);
        await this.page.getByRole('option', { name: new RegExp(returnTrip.to, 'i') }).first().click();
        await this.searchButton.click();
        await this.departureButton.click();
    }

    async searchSameOriginAndDestination(returnTrip) {
        await this.departureLocation.click();
        await this.departureLocation.fill(returnTrip.from);
        await this.page.getByRole('option', { name: new RegExp(returnTrip.from, 'i') }).first().click();
        await this.departureReturnButton.click();
        await this.page.locator('[aria-label="Departure date"]').getByRole('button', { name: this.dayLabel(returnTrip.departureDate), exact: true }).click();
        await this.page.locator('[aria-label="Return date"]').getByRole('button', { name: this.dayLabel(returnTrip.returnDate), exact: true }).click();  
        await this.page.keyboard.press('Escape');    
        await this.departureLocation.click(); 
        await this.page.waitForTimeout(1000); // Wait for the dropdown to appear
        await this.searchButton.click();
        
    }

}

module.exports = SearchResultsPage;