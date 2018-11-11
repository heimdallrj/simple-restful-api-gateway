const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

const {
  getHandlers,
  getCoreHandlers,
  getMiddlewares,
  getRouteConfigs
} = require("./core");
const { PORT } = require("./config");

// Create app instance.
const app = express();

const middlewares = getMiddlewares();
const routeConfigs = getRouteConfigs();
const handlers = getHandlers();
const coreHandlers = getCoreHandlers();

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
    const { path, type, func } = config;
    const methodKeyLowerCased = methodKey.toLowerCase();

    if (!type || type === "default") {
      const configMiddlewares = config.middlewares || [];
      const middlewareArray = configMiddlewares.map(m => middlewares[m]);

      app[methodKeyLowerCased](
        path,
        [...middlewareArray],
        handlers[methodKeyLowerCased][func]
      );
    }

    if (type === "proxy") {
      const { endpoint } = config;
      app[methodKeyLowerCased](
        path,
        coreHandlers[methodKeyLowerCased].proxy.bind(null, config)
      );
    }
  });
});

// Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
