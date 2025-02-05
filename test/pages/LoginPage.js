class LoginPage {
    
    get usernameField() { 
        return $('#user-name'); 
        return $('//input[@id="user-name"]');
    }
    get passwordField() { 
        return $('#password');
        return $('//input[@id="password"]');
    }
    get loginButton() { 
        return $('#login-button');
        return $('//input[@id="login-button"]');
    }
    get errorMessage() { 
        return $('//h3[@data-test="error"]');
    }


    async open() {
        await browser.url('/');
        await browser.url('https://www.saucedemo.com/');
    }

    async login(username, password) {
        try {
            await this.usernameField.waitForDisplayed({ timeout: 5000 });
            await this.usernameField.setValue(username);

            await this.passwordField.waitForDisplayed({ timeout: 5000 });
            await this.passwordField.setValue(password);

            await this.loginButton.waitForClickable({ timeout: 5000 });
            await this.loginButton.click();

        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    async getErrorMessage() {
        await this.errorMessage.waitForDisplayed({ timeout: 5000 });
        return await this.errorMessage.getText();
    }
}

module.exports = new LoginPage();