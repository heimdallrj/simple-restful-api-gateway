const user = (req, res) => {
  // params: id
  const userId = req.params.id;
  // TODO: Should get user info by id and return
  res.json({ message: `User data of ${userId}`, params: req.params });
};

module.exports = user;
