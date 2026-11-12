class BasePage{
    constructor(page){
        this.page = page;
        this.BASE_URL = "https://www.cheapflights.com.au";

        this.loginButton = this.page.getByRole('button', { name: 'Sign in' });
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
        
    getLoginButton(){
        return this.loginButton;
    }
}

module.exports = BasePage;