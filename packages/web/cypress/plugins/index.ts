/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

/// <reference types="cypress" />

// @ts-ignore, eslint-disable-next-line import/no-extraneous-dependencies
import browserify from "@cypress/browserify-preprocessor";

const pluginConfig: Cypress.PluginConfig = (on, config) => {
  const options = browserify.defaultOptions;
  options.browserifyOptions.transform[1][1].babelrc = true;
  options.typescript = require.resolve("typescript");

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("@cypress/code-coverage/task")(on, config);
  on("file:preprocessor", browserify(options));

  return config;
};

module.exports = pluginConfig;
