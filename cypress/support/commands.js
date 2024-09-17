Cypress.Commands.add('fillSignupForm', (userData, signUpPage) => {
  signUpPage.getSignUpPasswordTextBox().type(userData.login_password);
  signUpPage.getSignUpFirstNameTextBox().type(userData.signUp_firstName);
  signUpPage.getSignUpLastNameTextBox().type(userData.signUp_lastName);
  signUpPage.getSignUpAddressTextBox().type(userData.signUp_address);
  signUpPage.getSignUpStateTextBox().type(userData.signUp_state);
  signUpPage.getSignUpCityTextBox().type(userData.signUp_city);
  signUpPage.getSignUpZipCodeTextBox().type(userData.signUp_zipcode);
  signUpPage.getSignUpMobileNumberTextBox().type(userData.signUp_mobilePhone);
  signUpPage.getSignUpCreateAccountBtn().click();
});

Cypress.Commands.add('signupWithRandomEmail', (userData, loginPage, maxRetries = 5) => {
  let retryCount = 0;
  let newName;
  let newEmail;

  const attemptSignup = () => {
    newName = Cypress._.random(1, 10000);
    newEmail = `${newName}@gmail.com`;

    loginPage.getSignUpNameTextBox().clear().type(newName);
    loginPage.getSignUpEmailTextBox().clear().type(newEmail);
    loginPage.getSignUpBtn().click();

 cy.get('body').then((body) => {
	 if (body.find("[style='color: red;']").length > 0 && body.find("[style='color: red;']").text().includes('Email Address already exist!')) {
	   if (retryCount < maxRetries) {
	     retryCount++;
	     cy.log(`Retrying signup... Attempt #${retryCount}`);
	     return attemptSignup();
	   } else {
	     throw new Error(`Max retries reached. Unable to sign up after ${maxRetries} attempts.`);
	   }
	 } else {
	   return cy.wrap({ newName, newEmail });
	   }
		});
	};
  return attemptSignup();
});

Cypress.Commands.add('login', (loginPage, email, password) => {
  loginPage.getLoginEmailTextBox().clear().type(email);
  loginPage.getLoginPasswordTextBox().clear().type(password);
  loginPage.getLoginSubmitBtn().click();
});

Cypress.Commands.add('validateAddress', (checkOutPage, deliveryAddressSelector, billingAddressSelector) => {
  checkOutPage.getDeliveryAddressText().invoke('text').then((deliveryAddress) => {
  checkOutPage.getBillingAddressText().invoke('text').then((billingAddress) => {
    expect(deliveryAddress.trim()).to.eq(billingAddress.trim());
  });
 });
});

Cypress.Commands.add('addItemsToCartByKeyword', (mainPage, keyword) => {
  let foundItems = false;

  mainPage.getProductInfo().each(($el) => {
    const titleItem = $el.find('p').text();
    if (titleItem.includes(keyword)) {
      foundItems = true;
      $el.find('i').click();
    }
  }).then(() => {
    if (!foundItems) {
      cy.log(`No items found with keyword: ${keyword}`);
      throw new Error(`No items found with keyword: ${keyword}`);
    }
    mainPage.getCartBtn().click();
  });
});

Cypress.Commands.add('handlePaymentFields', (paymentFields, action) => {
  paymentFields.forEach(field => {
    const inputSelector = `input[name='${field.name}']`;

    if (action === 'validate') {
      cy.get(inputSelector).then(input => {
        const isValid = input[0].checkValidity();
        const message_filledIn = isValid ? '' : field.message_filledIn;
        const message_filledOut = isValid ? '' : field.message_filledOut;
        const expectedMessages = [message_filledIn, message_filledOut];

        expect(expectedMessages).to.include(input[0].validationMessage);
      });
    } else if (action === 'fill') {
      cy.get(inputSelector).type(field.value);
    }
  });
});

Cypress.Commands.add('verifyDownloadedFile', (fileName) => {
  const filePath = `cypress/downloads/${fileName}`;
  cy.readFile(filePath).should('exist');
  cy.readFile(filePath).should((fileContent) => {
    expect(fileName.endsWith('.txt')).to.be.true;
  });
});