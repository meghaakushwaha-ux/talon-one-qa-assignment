import homePage from '../../pages/HomePage';
import productPage from '../../pages/ProductPage';
import cartPage from '../../pages/CartPage';

describe('Laptop Purchase Flow', { testIsolation: false }, () => {
  let testData;
  let username;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
      username = `testuser_${Date.now()}`;
      cy.signup(username, testData.password);
      cy.login(username, testData.password);
    });
  });

  beforeEach(() => {
    homePage.visit();
    homePage.nameOfUser().should('be.visible');
  });

  it('test the cart is empty for a new account', () => {
    homePage.goToCart();
    cartPage.items().should('have.length', 0);
  });

  it('test a laptop is added to cart', () => {
    homePage.navigateToCategoryList('Laptops');
    homePage.selectRequiredProduct(testData.laptop);
    productPage.getPrice().should('contain', testData.laptopPrice);

    cy.window().then((win) => cy.stub(win, 'alert').as('cartAlert'));
    productPage.addToCart();
    cy.get('@cartAlert').should('have.been.calledWith', 'Product added.');

    homePage.goToCart();
    cartPage.containsItem(testData.laptop);
    cartPage.total().should('contain', testData.laptopPrice);
    cartPage.deleteItem(testData.laptop);
  });

  it('test order form when it is submitted without name and credit card', () => {
    homePage.goToCart();
    cartPage.placeOrder();

    cy.window().then((win) => cy.stub(win, 'alert').as('formAlert'));
    cartPage.confirmPurchase();
    cy.get('@formAlert').should('have.been.calledWith', 'Please fill out Name and Creditcard.');
  });

  it('test full laptop purchase flow', () => {
    homePage.navigateToCategoryList('Laptops');
    homePage.selectRequiredProduct(testData.laptop);
    productPage.getName().should('contain', testData.laptop);
    productPage.getPrice().should('contain', testData.laptopPrice);

    cy.window().then((win) => cy.stub(win, 'alert').as('cartAlert'));
    productPage.addToCart();
    cy.get('@cartAlert').should('have.been.calledWith', 'Product added.');

    homePage.goToCart();
    cartPage.items().should('have.length.greaterThan', 0);
    cartPage.containsItem(testData.laptop);
    cartPage.total().should('contain', testData.laptopPrice);

    cartPage.placeOrder();
    cartPage.fillOrder({
      name: testData.checkout.name,
      country: testData.checkout.country,
      city: testData.checkout.city,
      card: testData.checkout.creditCard,
      month: testData.checkout.month,
      year: testData.checkout.year,
    });

    cartPage.confirmPurchase();
    cartPage.successMessage().should('contain', 'Thank you for your purchase!');
    cartPage.orderDetails().should('contain', testData.checkout.name);
    cartPage.orderDetails().should('contain', `Amount: ${testData.laptopPrice} USD`);
    cartPage.dismissSuccess();
  });
});
