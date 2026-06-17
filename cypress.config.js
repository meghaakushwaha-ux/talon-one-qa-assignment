const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.demoblaze.com',
    env: {
      apiUrl: 'https://api.demoblaze.com',
    },
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    screenshotOnRunFailure: true,
    video: false,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-opts.json',
    },
  },
});
