class CartPage {
  itemList() {
    return cy.get('#tbodyid tr');
  }

  containsItem(name) {
    cy.get('#tbodyid').should('contain', name);
  }

  placeOrder() {
    cy.contains('button', 'Place Order').click();
    cy.wait(500);
    cy.get('#orderModal').should('be.visible');
  }

  fillOrderDetails({ name, country, city, card, month, year }) {
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

  successMessageIsShown() {
    return cy.get('.sweet-alert h2');
  }

  orderDetails() {
    return cy.get('.sweet-alert p.lead');
  }

  dismissSuccessMessage() {
    return cy.get('.sweet-alert .confirm').click();
  }
}

export default new CartPage();
