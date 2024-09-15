class CartPage {
	getCheckOutBtn() {
		return cy.get("[class='btn btn-default check_out']");
	}
}

export default CartPage;