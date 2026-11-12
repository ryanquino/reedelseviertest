class BasePage{
    constructor(page){
        this.page = page;
        this.BASE_URL = "https://www.cheapflights.com.au";
    }

    async navigateToHomepage(){
        await this.page.goto(this.BASE_URL);
        await this.page.waitForLoadState('domcontentloaded');
    }

    getLogo(){
        return this.page.getByRole('link', {
            name: 'Go to the cheapflights homepage'
        });
    }

}

module.exports = BasePage;