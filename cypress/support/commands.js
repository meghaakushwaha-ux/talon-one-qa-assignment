Cypress.Commands.add('signup', (username, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/signup`,
    body: { username, password: btoa(password) },
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/login`,
    body: { username, password: btoa(password) },
    headers: { 'Content-Type': 'application/json' },
  }).then(({ body }) => {
    const authToken = body.replace('Auth_token: ', '');
    cy.setCookie('tokenp_', authToken);
  });
  cy.visit('/');
  cy.get('#nameofuser', { timeout: 15000 }).should('be.visible');
});
