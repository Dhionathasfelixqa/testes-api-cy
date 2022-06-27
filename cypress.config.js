const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'sujg8f',
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    overwrite: false,
    html: false,
    json: true
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    baseUrl: 'http://localhost:3000/'
  }
})
