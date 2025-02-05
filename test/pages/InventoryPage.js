class InventoryPage {
    async resetAppState() {
        const burgerMenuButton = await $('//button[@id="react-burger-menu-btn"]');
        await burgerMenuButton.waitForClickable({ timeout: 10000 });
        await burgerMenuButton.click();

        const resetLink = await $('//a[@id="reset_sidebar_link"]');
        await resetLink.waitForClickable({ timeout: 10000 });
        await resetLink.click();
    }
    async addItemsToCart(productIndices) {
        
    }
    async addItemsToCart(productIndices) {
        if (!Array.isArray(productIndices)) {
            productIndices = [productIndices];
        }
    
        for (const index of productIndices) {
            const item = await $$('//div[@class="inventory_item"]')[index];
    
            await browser.waitUntil(async () => {
                return item && (await item.$('.//button[text()="Add to cart"]')).isExisting();
            }, { timeout: 10000, timeoutMsg: `Add to cart button not found for item at index ${index}` });
    
            const addToCartButton = await item.$('.//button[text()="Add to cart"]');
            await addToCartButton.waitForClickable({ timeout: 10000 });
            await addToCartButton.click();
        }
    }
    async addItemToCart(productIndices) {
        if (!Array.isArray(productIndices)) {
            productIndices = [productIndices];
        }

        for (const index of productIndices) {
            const item = await $$('//div[@class="inventory_item"]')[index];

            await browser.waitUntil(async () => {
                return item && (await item.$('.//button[text()="Add to cart"]')).isExisting();
            }, { timeout: 10000, timeoutMsg: `Add to cart button not found for item at index ${index}` });

            const addToCartButton = await item.$('.//button[text()="Add to cart"]');
            await addToCartButton.waitForClickable({ timeout: 10000 });
            await addToCartButton.click();
        }
    }


    async filterProducts() {
        const filterDropdown = await $('//select[@class="product_sort_container"]');
        await filterDropdown.waitForDisplayed({ timeout: 10000 });
        await filterDropdown.selectByVisibleText('Name (Z to A)');
    }

    async getProductName(index) {
        const inventoryContainer = await $('//div[@class="inventory_container"]');
        await inventoryContainer.waitForDisplayed({ timeout: 10000 });

        const productElements = await $$('div.inventory_item_name');

        await browser.waitUntil(async () => {
            return productElements.length > 0;
        }, { timeout: 10000, timeoutMsg: 'Product names not found' });

        if (productElements && productElements[index]) {
            const productName = await productElements[index].getText();
            console.log(`Product name at index ${index}:`, productName);
            return productName;
        } else {
            console.error(`Product name not found at index: ${index}`);
            console.log("Product Elements Count:", productElements.length);
            if (productElements.length > 0) {
                console.log("First Product Element HTML:", await productElements[0].getHTML());
            }
            console.log("All Product Elements HTML:", await Promise.all(productElements.map(el => el.getHTML())));
            return "";
        }
    }
}

module.exports = new InventoryPage();