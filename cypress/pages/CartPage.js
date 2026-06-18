class CartPage {
  items() {
    return cy.get('#tbodyid tr');
  }

  total() {
    return cy.get('#totalp');
  }

  containsItem(name) {
    return cy.get('#tbodyid').should('contain', name);
  }

  deleteItem(name) {
    cy.contains('#tbodyid tr', name).find('td:last-child a').click();
    cy.contains('#tbodyid tr', name).should('not.exist');
  }

  placeOrder() {
    cy.contains('button', 'Place Order').click();
    cy.get('#orderModal').should('be.visible');
  }

  fillOrder({ name, country, city, card, month, year }) {
    cy.get('#name').type(name);
    cy.get('#country').type(country);
    cy.get('#city').type(city);
    cy.get('#card').type(card);
    cy.get('#month').type(month);
    cy.get('#year').type(year);
  }

  confirmPurchase() {
    cy.contains('button', 'Purchase').click();
  }

  successMessage() {
    return cy.get('.sweet-alert h2');
  }

  orderDetails() {
    return cy.get('.sweet-alert p.lead');
  }

  dismissSuccess() {
    cy.get('.sweet-alert .confirm').click();
  }
}

export default new CartPage();
