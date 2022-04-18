const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

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

app.use("/api", bookRoutes);
app.use("/api", authorRoutes);
app.use("/api", categoryRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
