const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  let database = null;
  const { DB_DRIVER, DB_CONNECTIONS } = req.config;

  if (DB_DRIVER && DB_CONNECTIONS) {
    // Currently MongoDB Support only.
    // TODO: Add other supports as well.
    switch (DB_DRIVER) {
      case "mongo":
        const mongoDb = DB_CONNECTIONS.find(d => d.driver === DB_DRIVER);
        mongoose.Promise = global.Promise;
        mongoose.connect(mongoDb.url);
        database = mongoose.connection;

        db.on("error", console.error.bind(console, "MongoDB error:"));
        db.once("open", () => console.log("Connected to MongoDB"));

      default:
        database = null;
    }
  }

  req.database = database;
  next();
};
