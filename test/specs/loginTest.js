import LoginActions from '../actions/LoginActions.js';
import LoginPage from '../pages/LoginPage.js';

describe('SauceDemo Login Test', () => {

    async function pause(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    it('should display error message for locked_out_user', async () => {
        await LoginPage.open();
        await pause(1000);

        await LoginActions.loginWithLockedOutUser();
        await pause(1000);

        const errorMessage = await LoginPage.getErrorMessage();
        console.log("Error Message:", errorMessage);
        await pause(1000);

        expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
        await pause(1000);

        const loginButton = await $('#login-button');
        await loginButton.waitForDisplayed({ timeout: 5000 });
        expect(await loginButton.isDisplayed()).toBe(true);
        await pause(1000);

        await pause(1000);

    });
});