class PaymentPage {
	getPayAndConfirmOrderBtn() {
		return cy.get("[id='submit']");
	}
}

export default PaymentPage;