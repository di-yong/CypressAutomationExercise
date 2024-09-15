class MainPage {
	getSignUpLoginBtn() {
		return cy.get("[href='/login']");
	}
}

export default MainPage;