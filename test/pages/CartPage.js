class CartPage {
    async open() {
        await $(`//a[@class='shopping_cart_link']`).click();
    }

    async checkout(firstName, lastName, postalCode) {
        await $(`//button[@id='checkout']`).click();

        const firstNameInput = await $(`//input[@id='first-name']`);
        await firstNameInput.waitForDisplayed({ timeout: 5000 });
        await firstNameInput.setValue(firstName);

        const lastNameInput = await $(`//input[@id='last-name']`);
        await lastNameInput.waitForDisplayed({ timeout: 5000 });
        await lastNameInput.setValue(lastName);

        const postalCodeInput = await $(`//input[@id='postal-code']`);
        await postalCodeInput.waitForDisplayed({ timeout: 5000 });
        await postalCodeInput.setValue(postalCode);

        const continueButton = await $(`//input[@id='continue']`);
        await continueButton.waitForClickable({ timeout: 5000 });
        await continueButton.click();
    }

    async getCartItems() {
        return $$(`//div[@class='cart_item']`);
    }

    async getSummaryTotal() {
        return $(`//div[@class='summary_total_label']`);
    }

    async getSummarySubtotal() {
        return $('.summary_subtotal_label');
    }

    async open() {
        await browser.url('/cart.html');
    }
}

module.exports = new CartPage();