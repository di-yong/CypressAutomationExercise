class LoginPage {
	getSignUpNameTextBox() {
		return cy.get("[data-qa='signup-name']");
	}
	getSignUpEmailTextBox() {
		return cy.get("[data-qa='signup-email']");
	}
	getSignUpBtn() {
		return cy.get("[data-qa='signup-button']");
	}
}
export default LoginPage;