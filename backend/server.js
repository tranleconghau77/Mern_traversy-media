const createError = require("http-errors");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const client = require("./config/redis_connect");

const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const logEvents = require("./helpers/logEvent");

const connectDb = require("./config/mongo_connect");

const express = require("express");

const port = process.env.PORT || 5000;

connectDb();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cors());
app.use("/api", bookRoutes);
app.use("/api", authorRoutes);
app.use("/api", categoryRoutes);
app.use("/api", userRoutes);

app.use((req, res, next) =>
  next(createError.NotFound("The page is not found"))
);

app.use((err, req, res, next) => {
  logEvents(`${uuidv4()}  ${req.url}  ${req.method}  ${err.message}`);
  return res.json({
    status: err.status,
    message: err.status + " " + err.message,
    link: {
      docs: "https://www.google.com.vn/",
    },
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

exports.module = app;
