const express = require("express");
const app = express();

const { getHandlers, getMiddlewares, getRouteConfigs } = require("./core");
const { PORT } = require("./env");

const routeConfigs = getRouteConfigs();
const handlers = getHandlers();
const middlewares = getMiddlewares();

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
