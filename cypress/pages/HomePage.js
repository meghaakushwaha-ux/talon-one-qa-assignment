class HomePage {
  visit() {
    cy.visit('/');
  }

  openLoginForm() {
    cy.get('#login2').click();
    cy.get('#logInModal').should('be.visible');
  }

  openSignupForm() {
    cy.get('#signin2').click();
    cy.get('#signInModal').should('be.visible');
  }

  navigateToCategoryList(name) {
    cy.contains('.list-group-item', name).click();
    cy.get('.card-title').should('have.length.greaterThan', 0);
  }

  selectRequiredProduct(name) {
    cy.contains('.card-title a', name).click();
  }

  nameOfUser() {
    return cy.get('#nameofuser');
  }

  goToCart() {
    cy.get('#cartur').click();
    cy.url().should('include', 'cart');
  }
}

export default new HomePage();
