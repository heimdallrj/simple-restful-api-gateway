const config = require("../config");

module.exports = (req, res, next) => {
  req.config = config;
  next();
};
