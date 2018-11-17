# Simple RESTful API Gateway

JSON-based configurable RESTful API Gateway Project.

You just need to update `routes.json` and put respective logics in `handles/http/<get|post|put|delete|patch>` to enable the endpoint. If you need to add a new middleware, please put it in `middlewares` directory.

> Follow the naming conventions properly.

See examples here;

**routes.json**

```json
{
  "GET": [
    {
      "path": "/",
      "type": "static",
      "entrypoint": "public/"
    },
    {
      "path": "/api",
      "func": "welcome"
    },
    {
      "path": "/api/user/:id",
      "middlewares": ["authorize", "database"],
      "func": "user"
    },
    {
      "path": "/api/users",
      "type": "proxy",
      "endpoint": "https://jsonplaceholder.typicode.com/users"
    }
  ],
  "POST": [
    {
      "path": "/auth",
      "middlewares": ["authenticate"],
      "func": "authenticate"
    },
    {
      "path": "/api/user",
      "middlewares": ["authorize"],
      "func": "user"
    }
  ],
  "PUT": [],
  "DELETE": []
}
```

**handlers/http/get/user.js**

```js
const user = (req, res) => {
  // Get database instance.
  const db = req.database;

  // Access application configs.
  const config = req.config;

  // params: id
  const userId = req.params.id;

  // TODO: Should get user info by id and return
  res.json({ message: `User data of ${userId}`, ...req.params });
};

module.exports = user;
```

**middlewares/authenticate.js**

```js
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
```
