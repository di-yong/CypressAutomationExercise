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
	accountCreatedPage.getAccountCreatedSuccessText()
		.should('be.visible')
		.and('have.text', 'Account Created!');
})

Then('User clicks the Continue button', () => {
	accountCreatedPage.getAccountCreatedContinueBtn().click();
})

/*------------------Main page------------------*/
Then('User clicks the Logout button to Login Page', () => {
	mainPage.getLogOutBtn().click();
})

/*------------------Login page------------------*/
When('User inputs incorrect email, password and submit', () => {
	cy.login(loginPage, newEmail + 'i', userData.login_password + 'i');
})

Then('User validates the error message', () => {
	loginPage.getLoginErrorMessageText()
		.should('be.visible')
		.and('have.text', 'Your email or password is incorrect!');
})

When('User inputs correct email, password and submit', () => {
	cy.login(loginPage, newEmail, userData.login_password);
})

Then('User progress to the main page', () => {
	cy.url().should('eq', Cypress.env('baseUrl'));
})

/*------------------Main page------------------*/
When('User adds all Tshirts to the cart', () => {
  cy.addItemsToCartByKeyword(mainPage, 'Tshirt');
})

/*------------------View Cart page------------------*/
Then('User go to cart page to checkout', () => {
  cartPage.getCheckOutBtn().contains('Proceed To Checkout').click();
})

/*------------------Checkout page------------------*/
Then('User validates the address information', () => {
	 cy.validateAddress(checkOutPage, checkOutPage.getDeliveryAddressText(), checkOutPage.getBillingAddressText());
})

Then('User clicks the Place Order button to Payment page', () => {
	checkOutPage.getPlaceOrderBtn().contains('Place Order').click();
})

/*------------------Payment page------------------*/
When('User inputs nothing and validates the warning message', () => {
	paymentPage.getPayAndConfirmOrderBtn().contains('Pay and Confirm Order').click();
  // Proceed to Checkout in Incorrect Scenario
  cy.handlePaymentFields(paymentFields, 'validate');
})

Then('User inputs correct card information and clicks confirm order button', () => {
	cy.handlePaymentFields(paymentFields, 'fill');
  paymentPage.getPayAndConfirmOrderBtn().contains('Pay and Confirm Order').click();
})

/*------------------Payment Complete page------------------*/
When('User validates the order confirmed message', () => {
	paymentCompletePage.getOrderConfirmedText()
		.should('be.visible')
		.and('have.text', 'Congratulations! Your order has been confirmed!');
})

Then('User clicks the download invoice button', () => {
	paymentCompletePage.getDownloadInvoiceBtn().click();
})

Then('User verify the invoice document', () => {
	cy.verifyDownloadedFile('invoice.txt');
})
/*------------------Main page------------------*/
Then('User Scroll down to the bottom of the page', () => {
	 cy.scrollTo('bottom', { duration: 4000 });
})

When('User Scroll up to the top of the page', () => {
	 cy.scrollTo('top', { duration: 4000 });
})

Then('User validates the headers becomes visible again', () => {
	mainPage.getAutomationExerciseImg()
		.should('be.visible');
})

When('User clicks the Delete Account button', () => {
	mainPage.getDeleteAccountBtn().click();
})

/*------------------Delete Account page------------------*/
Then('User validates the account bas been deleted successful', () => {
	deleteAccountPage.getAccountDeletedText()
		.should('be.visible')
		.and('have.text', 'Account Deleted!');
})

Then('User clicks the Continue button to main page', () => {
	deleteAccountPage.getContinueBtn().click();
})