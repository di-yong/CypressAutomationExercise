const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
	require('cypress-mochawesome-reporter/plugin')(on);
  on("file:preprocessor", browserify.preprocessor(config));
  return config;
}

module.exports = defineConfig({
	reporter: 'cypress-mochawesome-reporter',
	defaultCommandTimeout: 6000,
	env: {
		baseUrl: 'https://automationexercise.com/'
	},
//	retries: {
//		runMode: 1,
//		openMode: 1
//	},
  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/integration/examples/*.feature',
    stepDefinitions: "cypress/integration/examples/purchaseOrder/*.js"
  },
});
