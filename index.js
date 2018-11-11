const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

const { getHandlers, getMiddlewares, getRouteConfigs } = require("./core");
const { PORT } = require("./config");

// Create app instance.
const app = express();

const middlewares = getMiddlewares();
const routeConfigs = getRouteConfigs();
const handlers = getHandlers();

// Initializing default middlewares
app.use(cors());
app.use(compression());
app.use(logger("dev"));
app.use(middlewares.config);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const methods = Object.keys(routeConfigs);

methods.forEach(methodKey => {
  const method = routeConfigs[methodKey];
  method.forEach(config => {
    const { path, func } = config;
    const configMiddlewares = config.middlewares || [];
    const middlewareArray = configMiddlewares.map(m => middlewares[m]);

    const methodKeyLowerCased = methodKey.toLowerCase();
    app[methodKeyLowerCased](
      path,
      [...middlewareArray],
      handlers[methodKeyLowerCased][func]
    );
  });
});

// Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
