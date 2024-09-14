/// <reference types="Cypress" />

describe('Testcase 24', function() {
	let userData;

	before(function(){
		cy.fixture('example').then((data) => {
			userData = data.userData;
		})
	})

	it('Testcase 24', function() {
		/*------------------Login page------------------*/
		// Navigate to the Home Page
		cy.visit("https://automationexercise.com/");
		cy.get("[href='/login']").click();

		/*------------------SignUp page------------------*/
		cy.signupWithRandomEmail(userData).then(({ newName, newEmail }) => {
    // Use the fixture data and generated newName to fill the signup form
    cy.fillSignupForm(userData, newName);
    cy.get("[data-qa='create-account']").click();
});
	});
});