/// <reference types="Cypress" />


describe('Testcase 24', () => {
	let userData;
	before(() => {
		cy.fixture('example').then((data) => {
			userData = data.userData;

		});
	});

	it('Testcase 24', () => {


		/*------------------Login page------------------*/
		cy.visit(Cypress.env('baseUrl'));
		mainPage.getSignUpLoginBtn().click();

		/*------------------SignUp page------------------*/
		cy.signupWithRandomEmail(userData, loginPage).then(({ newName, newEmail }) => {
    cy.fillSignupForm(userData, signUpPage);
		});
	});
});