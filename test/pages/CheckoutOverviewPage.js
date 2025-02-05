class CheckoutOverviewPage {
    async finishCheckout() {
        await $(`//button[@id='finish']`).click();
    }

    async getItemName(item) {
        return item.$(`.//div[@class='inventory_item_name']`).getText();
    }

    async getItemPrice(item) {
        const itemPriceStr = await item.$(`.//div[@class='inventory_item_price']`).getText();
        return parseFloat(itemPriceStr.replace('$', ''));
    }
    async getItemPriceElement(item) {
        const priceElement = await item.$('.inventory_item_price');

        return priceElement;
    }

    async getItemPrice(item) {
        const priceElement = await this.getItemPriceElement(item);
        const priceText = await priceElement.getText();
        return parseFloat(priceText.replace(/[$,]/g, ''));
    }

    async getSummarySubtotal() {
        return $('.summary_subtotal_label');
    }
    async getCheckoutItems() {
        return await $$('//div[@class="cart_item"]');
    }
    
    async getItemName(item) {
        return await item.$('.//div[@class="inventory_item_name"]').getText();
    }
    
    async getItemPrice(item) {
        const priceElement = await item.$('.//div[@class="inventory_item_price"]');
        const priceText = await priceElement.getText();
        return parseFloat(priceText.replace(/[$,]/g, ''));
    }
    
    async getSummarySubtotal(){
        return await $('//div[@class="summary_subtotal_label"]');
    }
    
    async getTax(){
        return await $('//div[@class="summary_tax_label"]');
    }
    
    async getSummaryTotal(){
        return await $('//div[@class="summary_total_label"]');
    }
}

module.exports = new CheckoutOverviewPage();