class SignUpPage {
	getSignUpPasswordTextBox() {
		return cy.get("[type='password']");
	}
	getSignUpFirstNameTextBox() {
  	return cy.get("[data-qa='first_name']");
  }
	getSignUpLastNameTextBox() {
		return cy.get("[data-qa='last_name']");
	}
	getSignUpAddressTextBox() {
		return cy.get("[data-qa='address']");
	}
	getSignUpStateTextBox() {
		return cy.get("[data-qa='state']");
	}
	getSignUpCityTextBox() {
		return cy.get("[data-qa='city']");
	}
	getSignUpZipCodeTextBox() {
	  return cy.get("[data-qa='zipcode']");
	}
	getSignUpMobileNumberTextBox() {
  	 return cy.get("[data-qa='mobile_number']");
  }
  getSignUpCreateAccountBtn() {
  	 return cy.get("[data-qa='create-account']");
  }
}

export default SignUpPage;