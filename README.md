# Simple RESTful API Gateway

TODO: Update README

```
{
  "GET": [
    {
      "path": "/api",
      "action": "welcome"
    },
    {
      "path": "/api/user/:id",
      "middlewares": ["authorize"],
      "action": "user"
    }
  ],
  "POST": [
    {
      "path": "/auth",
      "middlewares": ["authenticate"],
      "action": "authenticate"
    },
    {
      "path": "/api/user",
      "middlewares": ["authorize"],
      "action": "user"
    }
  ],
  "PUT": [],
  "DELETE": []
}
```
