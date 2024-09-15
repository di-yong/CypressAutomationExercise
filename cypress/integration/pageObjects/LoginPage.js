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
	getLoginEmailTextBox() {
		return cy.get("[name='email'][data-qa='login-email']");
	}
	getLoginPasswordTextBox() {
  	return cy.get("[name='password'][data-qa='login-password']");
  }
 	getLoginSubmitBtn() {
   	return cy.get("[type='submit'][data-qa='login-button']");
  }
  getLoginErrorMessageText() {
    return cy.get("[style='color: red;']");
  }

}
export default LoginPage;