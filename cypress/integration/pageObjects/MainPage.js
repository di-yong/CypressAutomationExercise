class MainPage {
	getSignUpLoginBtn() {
		return cy.get("[href='/login']");
	}
	getLogOutBtn() {
		return cy.get("[href='/logout']");
	}
	getProductInfo() {
		return cy.get("[class='productinfo text-center']");
	}
	getCartBtn() {
		return cy.get("[href='/view_cart'] [class='fa fa-shopping-cart']");
	}
}

export default MainPage;