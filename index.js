const express = require("express");
const app = express();

const routeConfigs = require("./config.json");
const actions = require("./actions");
const middlewares = require("./middlewares");

const { PORT } = require("./env");

const methods = Object.keys(routeConfigs);

methods.forEach(methodKey => {
  const method = routeConfigs[methodKey];
  method.forEach(config => {
    const { path, action } = config;
    const middlewaresArray = config.middlewares || [];
    const middlewaresFuncs = middlewaresArray.map(m => middlewares[m]);

    const methodKeyLowerCased = methodKey.toLowerCase();
    app[methodKeyLowerCased](
      path,
      [...middlewaresFuncs],
      actions[methodKeyLowerCased][action]
    );
  });
});

// Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
