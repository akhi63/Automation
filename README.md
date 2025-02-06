# SauceDemo End-to-End Tests
This project contains end-to-end (E2E) tests for the SauceDemo 
website using WebdriverIO and Mocha.  The tests cover the full purchase journey, 
including login, adding items to the cart, checkout, and logout.

## Project Overview
The tests are designed to ensure the core functionality of the SauceDemo website is working 
as expected.  They simulate a user interacting with the site, performing actions like adding 
products to the cart, going through the checkout process, and verifying order confirmation. 
The tests also include resetting the application state and logging out.

## Technologies Used

* **WebdriverIO:** The web testing framework used to automate browser interactions.
* **Mocha:** The JavaScript test framework.
* **Allure Reporter:** Generates detailed and visually appealing test reports.
* **Node.js and npm:** Used for managing project dependencies and running the tests.

## Setup and Installation

 **Clone the repository:**
    git clone [https://your-repository-url.git](https://your-repository-url.git)  // Replace with your repository URL
    cd your-project-directory

**Install dependencies:**
   * npm install
   * npm i --save-dev @wdio/cli
  *  npx wdio config 

**Install Allure CLI:**

   * npm install -g @allure-cli/allure-cli

# # Running the Tests

1.**Running Test Scenarios:**

  * Run altogether in a sequential way:
  specs: [
    './test/specs/loginTest.js',
    './test/specs/sauceDemoTest.js',
    './test/specs/performanceGlitchUserTest.js'
],

  * run separately by commenting in `wdio.conf.js`:
     specs: [
    './test/specs/loginTest.js',
   // './test/specs/sauceDemoTest.js',
   // './test/specs/performanceGlitchUserTest.js'
],

2.**Run the WebdriverIO tests:**

    * npx wdio run wdio.conf.js

3.**Generate the Allure report:**

   * npm run getReport
   
## Test Structure

The tests are organized into several spec files, each focusing on a specific part of the application:

* `loginTest.js`: Tests the login functionality.
* `sauceDemoTest.js`: Contains the main end-to-end purchase journey test.
* `performanceGlitchUserTest.js`: Tests the purchase journey with a performance glitch user.

## Page Objects

* `LoginPage`: Handles interactions with the login page.
* `InventoryPage`: Handles interactions with the inventory page.
* `CartPage`: Handles interactions with the shopping cart page.
* `CheckoutOverviewPage`: Handles interactions with the checkout overview page.
* `CheckoutCompletePage`: Handles interactions with the order confirmation page.


