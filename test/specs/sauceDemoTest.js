const loginPage = require('../pages/LoginPage');
const inventoryPage = require('../pages/InventoryPage');
const cartPage = require('../pages/CartPage');
const checkoutOverviewPage = require('../pages/CheckoutOverviewPage');
const checkoutCompletePage = require('../pages/CheckoutCompletePage');

describe('SauceDemo End-to-End Test', () => {

    async function pause(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    it('should perform the full purchase journey, reset app state, and logout', async () => {
        await loginPage.open();
        await pause(1000);
        await loginPage.login('standard_user', 'secret_sauce');
        await pause(1000);
        await inventoryPage.resetAppState();
        await pause(1000);
        await inventoryPage.addItemsToCart([0, 1, 2]);
        await pause(1000);
        await cartPage.open();
        await pause(1000);
        await cartPage.checkout('Test', 'User', '12345');
        await pause(1000);

        const cartItems = await cartPage.getCartItems();
        expect(cartItems.length).toBe(3);
        await pause(1000);

        let expectedSubtotal = 0;
        for (const item of cartItems) {
            const itemPrice = await checkoutOverviewPage.getItemPrice(item);
            expectedSubtotal += itemPrice;
        }
        await pause(1000);


        const summarySubtotalElement = await cartPage.getSummarySubtotal();
        await summarySubtotalElement.waitForDisplayed({ timeout: 5000 });

        const summarySubtotalText = await summarySubtotalElement.getText();
        const summarySubtotal = parseFloat(summarySubtotalText.replace(/[$,]/g, '').replace(/Item total: /, '').replace(/Subtotal: /, ''));

        expect(expectedSubtotal.toFixed(2)).toEqual(summarySubtotal.toFixed(2));
        await pause(1000);
        await checkoutOverviewPage.finishCheckout();
        await pause(1000);

        const successMessage = await checkoutCompletePage.getSuccessMessage();
        expect(successMessage).toEqual('Thank you for your order!');
        await pause(1000);
        await checkoutCompletePage.backToHome();
        await pause(1000);

        const locationDetails = await browser.execute(() => {
            return {
                href: window.location.href,
                pathname: window.location.pathname,
                origin: window.location.origin,
                host: window.location.host,
                hostname: window.location.hostname,
                protocol: window.location.protocol,
            };
        });

        console.log("Location Details (Inventory Page):", locationDetails);
        await expect(locationDetails.href).toContain('/inventory.html');
        await pause(1000);
        await inventoryPage.resetAppState();
        await pause(1000);

        const logoutLink = await $(`#logout_sidebar_link`);
        try {
            await logoutLink.waitForDisplayed({ timeout: 10000 });
            await logoutLink.waitForClickable({ timeout: 10000 });
            await logoutLink.click();
            await pause(1000);

           
            const logoutLocationDetails = await browser.execute(() => {
                return {
                    href: window.location.href,
                    pathname: window.location.pathname,
                    origin: window.location.origin,
                    host: window.location.host,
                    hostname: window.location.hostname,
                    protocol: window.location.protocol,
                };
            });

            console.log("Logout Location Details:", logoutLocationDetails);
            await expect(logoutLocationDetails.href).toContain('/');
            await pause(1000);

        } catch (error) {
            console.error("Something went wrong during logout:", error);
            throw error;
        }

    });
});