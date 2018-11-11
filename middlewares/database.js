const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const { DB_DRIVER, DB_CONNECTIONS } = req.config;
  // Currently MongoDB Support only.
  // TODO: Add other supports as well.

  // if DB_DRIVER == mongo
  const mongoDb = DB_CONNECTIONS.find(d => d.driver === DB_DRIVER);
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoDb.url);
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB error:"));
  db.once("open", () => console.log("Connected to MongoDB"));

  req.database = db;
  next();
};
