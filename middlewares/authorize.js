const jwt = require("jsonwebtoken");
const env = require("../env");

const authorize = (req, res, next) => {
  // Format: Authorization: Bearer <access_token>

  // Read header for bearerToken
  const authHeader = req.headers["authorization"];
  if (typeof authHeader !== "undefined") {
    const bearerToken = authHeader.split(" ")[1];

    // Verify bearerToken
    try {
      const authData = jwt.verify(bearerToken, env.SECRET_KEY);
      // TODO: Get decoded authData and verify it with the database
      // If user verified continue.
      // Otherwise, teject.
      // Ex-
      // if (!verifiedUser) {
      //   // Forbidden
      //   res.status(403).send({
      //     status: {
      //       code: 403,
      //       message: "Forbidden"
      //     }
      //   });
      // }

      next();
    } catch (error) {
      // Forbidden
      res.status(403).send({
        status: {
          code: 403,
          message: "Forbidden x"
        },
        error
      });
    }
  } else {
    // Forbidden
    res.status(403).send({
      status: {
        code: 403,
        message: "Forbidden y"
      }
    });
  }
};

module.exports = authorize;
