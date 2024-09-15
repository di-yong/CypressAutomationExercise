class AccountCreatedPage {
	getAccountCreatedSuccessText() {
		return cy.get("[data-qa='account-created']");
	}
	getAccountCreatedContinueBtn() {
		return cy.get("[data-qa='continue-button']");
	}
}

export default AccountCreatedPage;