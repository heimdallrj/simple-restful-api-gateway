const authenticate = require("./authenticate");
const authorize = require("./authorize");

const middlewares = { authenticate, authorize };

module.exports = middlewares;
