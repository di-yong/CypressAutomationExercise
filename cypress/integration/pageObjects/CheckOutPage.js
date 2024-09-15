class CheckOutPage {
	getDeliveryAddressText() {
		return cy.get("[id='address_delivery'] [class='address_city address_state_name address_postcode']");
	}
	getBillingAddressText() {
    return cy.get("[id='address_invoice'] [class='address_city address_state_name address_postcode']");
  }
  getPlaceOrderBtn() {
    return cy.get("[href='/payment']");
  }
}

export default CheckOutPage;