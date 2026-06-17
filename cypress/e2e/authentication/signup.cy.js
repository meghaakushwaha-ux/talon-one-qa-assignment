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
    const username = `testuser_${Date.now()}`;
    let alert = '';
    cy.on('window:alert', (message) => {
      alert = message;
    });

    signupPage.fillUsername(username);
    signupPage.fillPassword(testData.password);
    signupPage.submitForm();

    cy.wait(2000).then(() => {
      expect(alert).to.equal('Sign up successful.');
    });
  });

  it('test duplicate username is rejected', () => {
    const existing = 'existinguser123';

    signupPage.fillUsername(existing);
    signupPage.fillPassword(testData.password);
    signupPage.submitForm();
    cy.wait(1500);

    homePage.visit();
    homePage.openSignupForm();

    let alert = '';
    cy.on('window:alert', (message) => {
      alert = message;
    });

    signupPage.fillUsername(existing);
    signupPage.fillPassword(testData.password);
    signupPage.submitForm();

    cy.wait(2000).then(() => {
      expect(alert).to.equal('This user already exist.');
    });
  });

  it('test signup form rejects when username is empty', () => {
    let alert = '';
    cy.on('window:alert', (message) => {
      alert = message;
    });

    signupPage.fillPassword(testData.password);
    signupPage.submitForm();

    cy.wait(1500).then(() => {
      expect(alert).to.equal('Please fill out Username and Password.');
    });
  });

  it('test signup form rejects when password is empty', () => {
    let alert = '';
    cy.on('window:alert', (message) => {
      alert = message;
    });

    signupPage.fillUsername(`testuser_${Date.now()}`);
    signupPage.submitForm();

    cy.wait(1500).then(() => {
      expect(alert).to.equal('Please fill out Username and Password.');
    });
  });
});
