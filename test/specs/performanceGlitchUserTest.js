import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';

describe('SauceDemo Performance Glitch User Test', () => {
    it('should perform full purchase journey with performance_glitch_user', async () => {

        async function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        await LoginPage.open();
        await delay(3000);
        await LoginPage.login('performance_glitch_user', 'secret_sauce');
        await delay(3000);

        await InventoryPage.resetAppState();
        await delay(3000);

        await InventoryPage.filterProducts();
        await delay(3000);

        const firstProductName = await InventoryPage.getProductName(0);
        console.log("First Product Name:", firstProductName);
        expect(firstProductName).not.toBe("");
        await delay(3000);

        await InventoryPage.addItemToCart(0);
        await delay(3000);

        await CartPage.open();
        await delay(3000);
        await CartPage.checkout('Test', 'User', '12345');
        await delay(3000);

        const checkoutItems = await CheckoutOverviewPage.getCheckoutItems();
        expect(checkoutItems.length).toBe(1);
        await delay(3000);

        const checkoutItemName = await CheckoutOverviewPage.getItemName(checkoutItems[0]);
        expect(checkoutItemName).toBe(firstProductName);
        await delay(3000);


        await CheckoutOverviewPage.finishCheckout();
        await delay(3000);

        const successMessage = await CheckoutCompletePage.getSuccessMessage();
        expect(successMessage).toEqual('Thank you for your order!');
        await delay(3000);

        await InventoryPage.resetAppState();
        await delay(3000);

        const logoutLink = await $(`//a[@id='logout_sidebar_link']`);
        await logoutLink.waitForDisplayed({ timeout: 10000 }); // Keep explicit waits
        await logoutLink.waitForClickable({ timeout: 10000 });
        await logoutLink.click();
        await delay(3000);

        await browser.waitUntil(async function () {
            const currentUrl = await browser.getUrl();
            console.log("Current URL:", currentUrl);
            return currentUrl.includes('/');
        }, { timeout: 10000, timeoutMsg: 'Did not return to login page after logout' });

        const currentURLAfterLogout = await browser.getUrl();
        console.log("URL after logout:", currentURLAfterLogout);
        expect(currentURLAfterLogout).toContain('/');

        const loginButton = await $('#login-button');
        if (loginButton) {
            await loginButton.waitForDisplayed({ timeout: 10000 });
            expect(await loginButton.isDisplayed()).toBe(true);
        } else {
            console.log("Login button element not found. Check selector.");
            expect(false).toBe(true);
        }
    });
});