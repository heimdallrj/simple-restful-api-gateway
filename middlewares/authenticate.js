// Mock data
const user = {
  _id: 1,
  userName: "John Doe",
  email: "john.doe@example.com"
};

const authenticate = (req, res, next) => {
  // TODO: Read headers to authenticate data
  // Ex-
  // const { headers } = req;
  // const userName = headers["user"];
  // const pwd = headers["pwd"];
  // const subscriptionToken = headers["subscriptionToken"];

  // TODO: Verify user/token in the database and put it in the request if the user is veryfied.
  // Otherwise, reject.
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

  // Putting the verified user object with the request
  req.user = user;

  next();
};

module.exports = authenticate;
