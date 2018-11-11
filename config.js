const path = require("path");
require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  DB_DRIVER: process.env.DB_DRIVER,
  DB_CONNECTIONS: [
    {
      driver: process.env.DB_DRIVER,
      url: process.env.MONGO_URL
    }
  ],
  API_CONFIG_PATH: path.join(__dirname, "api.json"),
  HANDLER_PATH: path.join(__dirname, "handlers", "http"),
  CORE_HANDLER_PATH: path.join(__dirname, "core", "handlers", "http"),
  MIDDLEWARE_PATH: path.join(__dirname, "middlewares")
};

module.exports = config;
