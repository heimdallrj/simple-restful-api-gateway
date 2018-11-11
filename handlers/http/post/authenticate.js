const jwt = require("jsonwebtoken");

const authenticate = (req, res) => {
  const { SECRET_KEY } = req.config;
  const user = req.user;

  // jwt.sign({ user }, env.SECRET_KEY, { expiresIn: "30s" }, (err, token) => {
  jwt.sign({ user }, SECRET_KEY, (error, token) => {
    if (error) {
      // Forbidden
      res.status(403).send({ status: { code: 403, message: "Forbidden" } });
    }

    res.json({ token });
  });
};

module.exports = authenticate;
