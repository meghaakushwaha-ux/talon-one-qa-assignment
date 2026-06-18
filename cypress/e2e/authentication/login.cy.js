import homePage from '../../pages/HomePage';
import loginPage from '../../pages/LoginPage';

describe('Login', () => {
  let testData;
  let validUsername;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
      validUsername = `testuser_${Date.now()}`;
      cy.signup(validUsername, testData.password);
    });
  });

  beforeEach(() => {
    homePage.visit();
    homePage.openLoginForm();
  });

  it('test user logs in successfully with valid username and password', () => {
    cy.intercept('POST', '**/check').as('checkRequest');
    loginPage.fillUsername(validUsername);
    loginPage.fillPassword(testData.password);
    loginPage.submitForm();
    cy.wait('@checkRequest', { timeout: 15000 });
    homePage.nameOfUser().should('be.visible').and('contain', `Welcome ${validUsername}`);
  });

  it('test error is shown for wrong password', () => {
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
    loginPage.fillUsername(validUsername);
    loginPage.fillPassword('wrongpassword');
    loginPage.submitForm();
    cy.get('@alert').should('have.been.calledWith', 'Wrong password.');
  });

  it('test error is shown for a non-existent user', () => {
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
    loginPage.fillUsername('nonexistentuser_xyz_987');
    loginPage.fillPassword(testData.password);
    loginPage.submitForm();
    cy.get('@alert').should('have.been.calledWith', 'User does not exist.');
  });
});
