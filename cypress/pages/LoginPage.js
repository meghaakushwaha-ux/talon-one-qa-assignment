class LoginPage {
  fillUsername(username) {
    cy.get('#loginusername').clear().type(username);
  }

  fillPassword(password) {
    cy.get('#loginpassword').clear().type(password);
  }

  submitForm() {
    cy.get('[onclick="logIn()"]').click();
  }
}

export default new LoginPage();
