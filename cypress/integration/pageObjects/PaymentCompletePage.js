class PaymentCompletePage {
	getOrderConfirmedText() {
		return cy.get("[class='col-sm-9 col-sm-offset-1'] p");
	}
	getDownloadInvoiceBtn() {
		return cy.get("[class='btn btn-default check_out']");
	}
}

export default PaymentCompletePage;