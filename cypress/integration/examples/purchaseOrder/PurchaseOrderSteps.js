/// <reference types="Cypress" />
import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import MainPage from '../../pageObjects/MainPage';
import LoginPage from '../../pageObjects/LoginPage';
import SignUpPage from '../../pageObjects/SignUpPage';

const mainPage = new MainPage();
const loginPage = new LoginPage();
const signUpPage = new SignUpPage();

let userData;
	before(() => {
		cy.fixture('example').then((data) => {
			userData = data.userData;

		});
	});

Given('User opens the website', () => {
	cy.visit(Cypress.env('baseUrl'));
})

When('User clicks the signup login button', () => {
	mainPage.getSignUpLoginBtn().click();
})

Then('User enter account and address information to create account', () => {
	cy.signupWithRandomEmail(userData, loginPage).then(({ newName, newEmail }) => {
  cy.fillSignupForm(userData, signUpPage);
  });
})
