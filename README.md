# Demoblaze — Talon.One Assignment

This is a automated test suite for the web application https://www.demoblaze.com - an online store where customers can buy a variety of electronics, including mobile phones laptops, and more. The testing suite specifically considers Login, Sign-up and Laptop purchase flow.

## Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm

## Setup

Clone the repository and navigate into it

   ```bash
   git clone https://github.com/meghaakushwaha-ux/talon-one-qa-assignment.git
   cd talon-one-qa-assignment
   ```

Install dependencies

   ```bash
   npm install
   npx cypress install
   ```

## Running the tests

Open Cypress UI:
```bash
npm run cy:open
```

Run all tests headless:
```bash
npm run cy:run
```

## View test report

```bash
npm run report
open mochawesome-report/report.html
```

## Testing approach

I considered testing the login, sign up and laptop purchase flow as I thought these would be critical . I added few negative and positive scenarios to check the flow in depth so that erros messages are also validated. Here is the full list of tests:

**Laptop Purchase Flow**
- test the cart is empty for a new account
- test a laptop is added to cart
- test order form when it is submitted without name and credit card
- test full laptop purchase flow

**Sign Up**
- test user registers successfully with a new username
- test duplicate username is rejected
- test signup form rejects when username is empty
- test signup form rejects when password is empty

**Login**
- test user logs in successfully with valid username and password
- test error is shown for wrong password

**Design approach:**
As we had to create test IDs in advance(recommended in the instructions) I added the api to create the test accounts. Also I used `testIsolation: false` in Laptop purchase flow so that the cookies and login is not reset for every test.

## AI Tool Usage and Disclosure

I haven't used AI in this project and the whole work is mine including the ideas and how the flow will works. As the assignment required not to use AI I did not use it and build this project from scratch.
