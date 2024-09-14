Cypress.Commands.add('fillSignupForm', (userData, newName) => {
  cy.get("[type='password']").type(userData.login_password);
  cy.get("[data-qa='first_name']").type(newName);
  cy.get("[data-qa='last_name']").type(newName);
  cy.get("[data-qa='address']").type(userData.signUp_address);
  cy.get("[data-qa='state']").type(userData.signUp_state);
  cy.get("[data-qa='city']").type(userData.signUp_city);
  cy.get("[data-qa='zipcode']").type(userData.signUp_zipcode);
  cy.get("[data-qa='mobile_number']").type(userData.signUp_mobilePhone);
});

Cypress.Commands.add('signupWithRandomEmail', (userData, maxRetries = 5) => {
  let retryCount = 0;
  let newName;
  let newEmail;

  const attemptSignup = () => {
    newName = Cypress._.random(1, 10000);
    newEmail = `${newName}@gmail.com`;

    cy.get("[data-qa='signup-name']").type(newName);
    cy.get("[data-qa='signup-email']").type(newEmail);
    cy.get("[data-qa='signup-button']").click();

    cy.get('body').then((body) => {
      if (body.find("[style='color: red;']").length > 0 && body.find("[style='color: red;']").text().includes('Email Address already exist!')) {
        if (retryCount < maxRetries) {
          retryCount++;
          cy.log(`Retrying signup... Attempt #${retryCount}`);
          attemptSignup(); // Recursively call if retry count is within limits
        } else {
          throw new Error('Max retries reached. Unable to sign up after ${maxRetries} attempts.');
        }
      }
      return { newName, newEmail };
    });
  }
  return attemptSignup();
});
