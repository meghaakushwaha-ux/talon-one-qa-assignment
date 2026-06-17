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
    cartPage.itemList().should('have.length', 0);
  });

  it('test a laptop is added to cart', () => {
    homePage.navigateToCategoryList('Laptops');
    homePage.selectRequiredProduct(testData.laptop);

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Product added.');
    });
    productPage.addToCart();
    cy.wait(1500);

    homePage.goToCart();
    cartPage.containsItem(testData.laptop);
  });

  it('test order form when it is submitted without name and credit card', () => {
    homePage.goToCart();
    cartPage.placeOrder();

    let alertMessage = '';
    cy.on('window:alert', (message) => {
      alertMessage = message;
    });

    cartPage.confirmPurchase();

    cy.wait(1500).then(() => {
      expect(alertMessage).to.equal('Please fill out Name and Creditcard.');
    });
  });

  it('test full laptop purchase flow', () => {
    homePage.navigateToCategoryList('Laptops');
    homePage.selectRequiredProduct(testData.laptop);
    productPage.getName().should('contain', testData.laptop);

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Product added.');
    });
    productPage.addToCart();
    cy.wait(1500);

    homePage.goToCart();
    cartPage.itemList().should('have.length.greaterThan', 0);
    cartPage.containsItem(testData.laptop);

    cartPage.placeOrder();
    cartPage.fillOrderDetails({
      name: testData.checkout.name,
      country: testData.checkout.country,
      city: testData.checkout.city,
      card: testData.checkout.creditCard,
      month: testData.checkout.month,
      year: testData.checkout.year,
    });
    cartPage.confirmPurchase();
    cartPage.successMessageIsShown().should('contain', 'Thank you for your purchase!');
    cartPage.orderDetails().should('contain', testData.checkout.name);
    cartPage.dismissSuccessMessage();
  });
});
