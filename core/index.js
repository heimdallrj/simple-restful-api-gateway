// NOTE: Do not change this file unless you know exactly what you do.

const fs = require("fs");
const path = require("path");

const { HANDLER_PATH, MIDDLEWARE_PATH, API_CONFIG_PATH } = require("../config");

const core = {
  getHandlers: () => {
    // Core: Fetch and return all http method signatures.
    const handlers = {};
    fs.readdirSync(HANDLER_PATH)
      .map(dirOrFile => {
        if (fs.statSync(path.join(HANDLER_PATH, dirOrFile)).isDirectory())
          return dirOrFile;
      })
      .filter(dir => !!dir)
      .forEach(method => {
        handlers[method] = {};
        fs.readdirSync(path.join(HANDLER_PATH, method)).forEach(fp => {
          const func = fp.split(".")[0];
          handlers[method][func] = require(path.join(HANDLER_PATH, method, fp));
        });
      });
    return handlers;
  },

  getMiddlewares: () => {
    // Core: Fetch and return all middleware signatures.
    const middlewares = {};
    fs.readdirSync(MIDDLEWARE_PATH).forEach(file => {
      const func = file.split(".")[0];
      middlewares[func] = require(path.join(MIDDLEWARE_PATH, file));
    });
    return middlewares;
  },

  getRouteConfigs: () => require(API_CONFIG_PATH)
};

module.exports = core;
