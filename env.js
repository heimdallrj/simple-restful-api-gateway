const path = require("path");

const config = {
  PORT: 3001,
  SECRET_KEY: "secretkey",
  API_CONFIG_PATH: path.join(__dirname, "config.json"),
  HANDLER_PATH: path.join(__dirname, "handlers", "http"),
  MIDDLEWARE_PATH: path.join(__dirname, "middlewares")
};

module.exports = config;
