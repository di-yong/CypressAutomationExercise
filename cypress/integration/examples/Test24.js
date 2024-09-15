/// <reference types="Cypress" />
import MainPage from '../pageObjects/MainPage';
import LoginPage from '../pageObjects/LoginPage';
import SignUpPage from '../pageObjects/SignUpPage';

describe('Testcase 24', function() {
	let userData;

	before(function(){
		cy.fixture('example').then((data) => {
			userData = data.userData;
		})
	})

	it('Testcase 24', function() {
		const mainPage = new MainPage();
		const loginPage = new LoginPage();
		const signUpPage = new SignUpPage();

		/*------------------Login page------------------*/
		cy.visit("https://automationexercise.com/");
		mainPage.getSignUpLoginBtn().click();

		/*------------------SignUp page------------------*/
		cy.signupWithRandomEmail(userData, loginPage).then(({ newName, newEmail }) => {
    cy.fillSignupForm(userData, signUpPage);

		});
	});
});