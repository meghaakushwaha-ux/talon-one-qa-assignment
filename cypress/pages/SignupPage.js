class SignupPage {
  fillUsername(username) {
    cy.get('#sign-username').clear().type(username);
  }

  fillPassword(password) {
    cy.get('#sign-password').clear().type(password);
  }

  submitForm() {
    cy.get('[onclick="register()"]').click();
  }
}

export default new SignupPage();
