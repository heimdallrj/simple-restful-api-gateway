const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const urlPath = require("path");

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

// TODO: Optimize below code block for readablity and scalability.
const methods = Object.keys(routeConfigs);

methods.forEach(methodKey => {
  const method = routeConfigs[methodKey];
  method.forEach(config => {
    const { path, type, func } = config;
    const funcHandler = methodKey.toLowerCase();

    if (!type || type === "default") {
      const configMiddlewares = config.middlewares || [];
      const middlewareArray = configMiddlewares.map(m => middlewares[m]);
      app[funcHandler](path, middlewareArray, handlers[funcHandler][func]);
    }

    if (type === "proxy") {
      const { endpoint } = config;
      app[funcHandler](
        path,
        coreHandlers[funcHandler].proxy.bind(null, config)
      );
    }

    if (type === "static") {
      const { entrypoint } = config;
      app.use(path, express.static(urlPath.join(__dirname, entrypoint)));
    }
  });
});

// Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
