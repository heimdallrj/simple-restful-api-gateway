const user = (req, res) => {
  // TODO: Should get user data by reading req.body and create new user
  res.json({
    message: `New user created.`,
    ...req.body
  });
};

module.exports = user;
