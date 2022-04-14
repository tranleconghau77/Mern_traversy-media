const goalRoute = require("./routes/goalRoutes");
const connectDb = require("./config/db");

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

connectDb();
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api", goalRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
