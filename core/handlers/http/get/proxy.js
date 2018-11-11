const request = require("request");

const proxy = ({ endpoint }, req, res) => {
  request(endpoint, (error, response, body) => {
    const data = JSON.parse(body);
    res.json({ message: data, error });
  });
};

module.exports = proxy;
