const welcome = (req, res) => {
  res.json({ message: "Simple RESTful API Gateway." });
};

module.exports = welcome;
