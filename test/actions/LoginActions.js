import LoginPage from '../pages/LoginPage.js';

class LoginActions {
    async loginWithLockedOutUser() {
        await LoginPage.open();
        await LoginPage.login('locked_out_user', 'secret_sauce');
    }
}

export default new LoginActions();