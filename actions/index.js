const actions = {
  get: require("./http/get"),
  post: require("./http/post"),
  put: require("./http/put"),
  delete: require("./http/delete"),
  patch: require("./http/patch")
};

module.exports = actions;
