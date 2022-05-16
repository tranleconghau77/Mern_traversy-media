const client = require("./redis_connect");

const value = client.get("books", (err, reply) => {
  if (reply) {
    console.log(reply);
  }
  if (err) console.log(err);
});

console.log(value);
