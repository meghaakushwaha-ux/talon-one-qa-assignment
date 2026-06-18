import homePage from '../../pages/HomePage';
import signupPage from '../../pages/SignupPage';

describe('Sign Up', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    homePage.visit();
    homePage.openSignupForm();
  });

  it('test user registers successfully with a new username', () => {
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
    signupPage.fillUsername(`testuser_s${Date.now()}`);
    signupPage.fillPassword(testData.password);
    signupPage.submitForm();
    cy.get('@alert').should('have.been.calledWith', 'Sign up successful.');
  });

  it('test duplicate username is rejected', () => {
    const existing = 'existinguser123';

    cy.window().then((win) => cy.stub(win, 'alert').as('firstAlert'));
    signupPage.fillUsername(existing);
    signupPage.fillPassword(testData.password);
    signupPage.submitForm();
    cy.get('@firstAlert').should('have.been.called');

    homePage.visit();
    homePage.openSignupForm();

    cy.window().then((win) => cy.stub(win, 'alert').as('dupAlert'));
    signupPage.fillUsername(existing);
    signupPage.fillPassword(testData.password);
    signupPage.submitForm();
    cy.get('@dupAlert').should('have.been.calledWith', 'This user already exist.');
  });

  it('test signup form rejects when username is empty', () => {
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
    signupPage.fillPassword(testData.password);
    signupPage.submitForm();
    cy.get('@alert').should('have.been.calledWith', 'Please fill out Username and Password.');
  });

  it('test signup form rejects when password is empty', () => {
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
    signupPage.fillUsername(`testuser_s${Date.now()}`);
    signupPage.submitForm();
    cy.get('@alert').should('have.been.calledWith', 'Please fill out Username and Password.');
  });
});
