class ProductPage {
  getName() {
    return cy.get('.name');
  }

  addToCart() {
    cy.contains('a.btn', 'Add to cart').click();
  }
}

export default new ProductPage();
