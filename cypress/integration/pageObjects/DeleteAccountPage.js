class DeleteAccountPage {
	getAccountDeletedText() {
		return cy.get("[data-qa='account-deleted'] b");
	}
	getContinueBtn() {
		return cy.get("[data-qa='continue-button']");
	}
}

export default DeleteAccountPage;