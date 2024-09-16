/// <reference types="Cypress" />
import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import MainPage from '../../pageObjects/MainPage';
import LoginPage from '../../pageObjects/LoginPage';
import SignUpPage from '../../pageObjects/SignUpPage';
import AccountCreatedPage from '../../pageObjects/AccountCreatedPage';
import CartPage from '../../pageObjects/CartPage';
import CheckOutPage from '../../pageObjects/CheckOutPage';
import PaymentPage from '../../pageObjects/PaymentPage';
import PaymentCompletePage from '../../pageObjects/PaymentCompletePage';
import DeleteAccountPage from '../../pageObjects/DeleteAccountPage';

const mainPage = new MainPage();
const loginPage = new LoginPage();
const signUpPage = new SignUpPage();
const accountCreatedPage = new AccountCreatedPage();
const cartPage = new CartPage();
const checkOutPage = new CheckOutPage();
const paymentPage = new PaymentPage();
const paymentCompletePage = new PaymentCompletePage();
const deleteAccountPage = new DeleteAccountPage();

//const fields = [
//	{name: 'name_on_card', value: 'DiTest', message: 'Please fill out this field.'},
//	{name: 'card_number', value: '123456789', message: 'Please fill out this field.'},
//	{name: 'cvc', value: '01', message: 'Please fill out this field.'},
//	{name: 'expiry_month', value: '02', message: 'Please fill out this field.'},
//	{name: 'expiry_year', value: '2042', message: 'Please fill out this field.'}
//];

let userData;
let paymentFields;
let newName;
let newEmail;

beforeEach(() => {
	cy.clearCookies();
	cy.clearLocalStorage();
	cy.fixture('userData').then((data) => {
		userData = data.userData;
	});
	cy.fixture('paymentFields').then((data) => {
    paymentFields = data.paymentFields;
  });
});

/*------------------Main page------------------*/
Given('User navigates to the Main page', () => {
	cy.visit(Cypress.env('baseUrl'));
})

When('User clicks the signup login button', () => {
	mainPage.getSignUpLoginBtn().click();
})

/*------------------SignUp page------------------*/
Then('User enter account and address information to create account', () => {
	cy.signupWithRandomEmail(userData, loginPage).then((generatedData) => {
  newName = generatedData.newName;
  newEmail = generatedData.newEmail;
  cy.fillSignupForm(userData, signUpPage);
  })
})

/*------------------Account created page------------------*/
When('User validates the account created message', () => {
	accountCreatedPage.getAccountCreatedSuccessText().should('have.text', 'Account Created!');
})

Then('User clicks the Continue button', () => {
	accountCreatedPage.getAccountCreatedContinueBtn().click();
})

/*------------------Main page------------------*/
Then('User clicks the Logout button to Login Page', () => {
	mainPage.getLogOutBtn().click();
})

/*------------------Login page------------------*/
When('User inputs incorrect email and password', () => {
	loginPage.getLoginEmailTextBox().type(newEmail + 'i');
  loginPage.getLoginPasswordTextBox().type(userData.login_password + 'i');
  loginPage.getLoginSubmitBtn().click();
})

Then('User validates the error message', () => {
	loginPage.getLoginErrorMessageText().should('have.text', 'Your email or password is incorrect!');
})

When('User inputs correct email and password', () => {
	loginPage.getLoginEmailTextBox().clear().type(newEmail);
  loginPage.getLoginPasswordTextBox().clear().type(userData.login_password);
})

Then('User click the Login button to Main Page', () => {
	loginPage.getLoginSubmitBtn().click();
})

/*------------------Main page------------------*/
When('User adds all Tshirts to the cart', () => {
	mainPage.getProductInfo().each(($el, index, $list) => {
    const titleItem = $el.find("p").text();
    if(titleItem.includes('Tshirt')) {
      $el.find("i").click();
    }
  });
  mainPage.getCartBtn().click();
})

/*------------------View Cart page------------------*/
Then('User go to cart page to checkout', () => {
  cartPage.getCheckOutBtn().contains('Proceed To Checkout').click();
})

/*------------------Checkout page------------------*/
Then('User validates the address information', () => {
	checkOutPage.getDeliveryAddressText().invoke('text').then((text1) => {
  checkOutPage.getBillingAddressText().invoke('text').then((text2) => {
    expect(text1.trim()).to.eq(text2.trim());
    });
  });
})

Then('User clicks the Place Order button to Payment page', () => {
	checkOutPage.getPlaceOrderBtn().contains('Place Order').click();
})

/*------------------Payment page------------------*/
When('User inputs nothing and validates the warning message', () => {
	paymentPage.getPayAndConfirmOrderBtn().contains('Pay and Confirm Order').click();

    // Proceed to Checkout in Incorrect Scenario
    paymentFields.forEach(field => {
      cy.get(`input[name='${field.name}']`).then(input => {
        const isValid = input[0].checkValidity();
        const message = isValid ? '' : field.message;
        expect(input[0].validationMessage).to.eq(message);
      });
    });
})

Then('User inputs correct card information and clicks confirm order button', () => {
	paymentFields.forEach(field => {
    cy.get(`input[name='${field.name}']`).type(field.value);
  });
  paymentPage.getPayAndConfirmOrderBtn().contains('Pay and Confirm Order').click();
})

/*------------------Payment Complete page------------------*/
When('User validates the order confirmed message', () => {
	paymentCompletePage.getOrderConfirmedText().should('have.text', 'Congratulations! Your order has been confirmed!');
})

Then('User clicks the download invoice button', () => {
	paymentCompletePage.getDownloadInvoiceBtn().click();
})

Then('User verify the invoice document', () => {
	const fileName = 'invoice.txt';
  const filePath = `cypress/downloads/${fileName}`;
  cy.readFile(filePath).should('exist');
  cy.readFile(filePath).should((fileContent) => {
  expect(fileName.endsWith('.txt')).to.be.true;
	})
})
/*------------------Main page------------------*/
Then('User Scroll down to the bottom of the page', () => {
	 cy.scrollTo('bottom', { duration: 4000 });
   cy.wait(1000);
})

When('User Scroll up to the top of the page', () => {
	 cy.scrollTo('top', { duration: 4000 });
})

Then('User validates the headers becomes visible again', () => {
	mainPage.getAutomationExerciseImg().should('be.visible');
})

When('User clicks the Delete Account button', () => {
	mainPage.getDeleteAccountBtn().click();
})

/*------------------Delete Account page------------------*/
Then('User validates the account bas been deleted successful', () => {
	deleteAccountPage.getAccountDeletedText().should('have.text', 'Account Deleted!');
})

Then('User clicks the Continue button to main page', () => {
	deleteAccountPage.getContinueBtn().click();
})