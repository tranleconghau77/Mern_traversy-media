const express = require("express");

const port = 3000;

const app = new express();

app.use("/", () => {
  console.log("Hello");
});

app.listen(3000);
