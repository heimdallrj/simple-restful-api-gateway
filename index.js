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
    const { path, func } = config;
    const middlewaresArray = config.middlewares || [];
    const middlewareFuncs = middlewaresArray.map(m => middlewares[m]);

    const methodKeyLowerCased = methodKey.toLowerCase();
    app[methodKeyLowerCased](
      path,
      [...middlewareFuncs],
      actions[methodKeyLowerCased][func]
    );
  });
});

// Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
