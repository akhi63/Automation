class CheckoutCompletePage {

    async getSuccessMessage() {
        try {
            const successMessageElement = await $('//h2[@class="complete-header"]');
            await successMessageElement.waitForDisplayed({ timeout: 5000 });
            return await successMessageElement.getText();
        } catch (error) {
            console.error("Error getting success message:", error);
            return "";
        }
    }

    async backToProducts() {
        try {
            const backToProductsButton = await $('#back-to-products');
            await backToProductsButton.waitForClickable({ timeout: 5000 });
            await backToProductsButton.click();
        } catch (error) {
            console.error("Error clicking 'Back to Products':", error);
        }
    }

    async backToHome() {
        try {
            const backHomeButton = await $('#back-to-products');
            await backHomeButton.waitForClickable({ timeout: 30000 });
            await backHomeButton.click();
    
            console.log("URL immediately after click:", await browser.getUrl());

        } catch (error) {
            console.error("Error in backToHome():", error);
        }
       
const inventoryItem = await $('.inventory_item');
await inventoryItem.waitForDisplayed({ timeout: 30000 });

const currentUrl = await browser.getUrl();
await expect(currentUrl).toContain('/inventory.html');
    }
}

module.exports = new CheckoutCompletePage();