class ProductPage {
  addToCart() {
    cy.contains('a.btn', 'Add to cart').click();
  }

  getName() {
    return cy.get('.name');
  }

  getPrice() {
    return cy.get('.price-container');
  }
}

export default new ProductPage();
