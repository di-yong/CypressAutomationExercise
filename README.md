# Cypress Automation Exercise Project

This project automates testing for the website **automationexercise.com** using **Cypress 13**. The goal is to implement end-to-end (E2E) testing with Page Object Model (POM) design and Behavior-Driven Development (BDD) practices. Key components include:

## Key Features

**Purchase Order Automation**: Automates the process of placing a purchase order, verifying all steps from cart addition to payment completion.

**Page Object Model (POM)**: Uses a structured approach with separate classes for each page (e.g., `LoginPage`, `MainPage`, `CartPage`) to enhance maintainability.

**Data-Driven Testing**: Utilizes test data from JSON files (`userData.json`, `paymentFields.json`) for flexible and reusable tests.

**Custom Commands**: Includes custom Cypress commands (`commands.js`) for reusability across tests.

**HTML Reports**: Generates detailed test reports (`index.html`) for visual analysis.

**Cucumber BDD**: Featue files written in Gherkin syntax to enhance test readability.

## How to Run the Tests

### Prerequisites

- [Node.js](https://nodejs.org/) version 20.x or above
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)


### Setup Installation

#### 1. Clone the Repository

```
git clone https://github.com/di-yong/CypressAutomationExercise.git
cd CypressAutomationExercise
```
#### 2. Install Dependencies

Using `npm`:

```
npm install
```

### Running Tests

#### Run Tests Locally
You can run the tests in both headless and headed modes:
- Running in Headless Mode:

  ```
  npx cypress run
  ```

- Running in Headed Mode (with browser UI):

  ```
  npx cypress open
  ```
This command will open the Cypress Test Runner where you can select the tests to execute.

#### 2. Running Specific Feature Tests

- To run tests for a specific feature (e.g., purchase order):

  ```
  npx cypress run --spec "cypress/integration/examples/purchaseOrder.feature"
  ```

This will open the Cypress Test Runner, where you can run all the test suites and view the execution.

## Project Structure

`cypress/downloads/`: Contains any downloaded files from tests (e.g., `invoice.txt`).

`cypress/fixtures/`: Test data in JSON format.

- `paymentFields.json`: Payment form data.
- `userData.json`: User account data.

`cypress/integration/examples/purchaseOrder/`: Test steps and feature files for purchase orders.

- `PurchaseOrderSteps.js`: Step definitions.
- `purchaseOrder.feature`: Feature file for purchase order tests.

`cypress/pageObjects/`: Page Object Model (POM) files.

- `AccountCreatedPage.js`, `LoginPage.js`, `MainPage.js`, etc.

`cypress/reports/html/`: HTML reports generated after test execution.

- `index.html`: Main report file.

`cypress/support/`: Support files for custom commands and configuration.

- `commands.js`, `e2e.js`

`cypress.config.js`: Cypress configuration settings.

`package.json`: Project dependencies and scripts.


## Custom Commands

The following custom commands have been added to enhance and simplify the test suite:

- **`cy.addItemsToCartByKeyword(mainPage, keyword)`**: Adds all items that match a specific keyword to the cart.
- **`cy.fillSignupForm(userData, signUpPage)`**: Automatically fills the signup form with data from `userData`.
- **`cy.signupWithRandomEmail(userData, loginPage)`**: Signs up using a randomly generated email and logs in the user.
- **`cy.validateAddress(checkOutPage, deliveryAddressSelector, billingAddressSelector)`**: Validates that the delivery and billing addresses are the same.
- **`cy.verifyDownloadedFile(fileName)`**: Verifies the downloaded invoice or any other file during tests.
  
## Reporting

The test reports are generated in the `/cypress/reports/html/index.html` file. You can view the test results by opening this file in a browser.

## License

This project is licensed under the MIT License.

## Author

**Di Yong**

[LinkedIn](https://www.linkedin.com/in/di-yong/)
