const express = require("express");

const goalRoute = express.Router();

goalRoute.get("/goals", (req, res) =>
  res.status(200).json({ msg: "Get goals API" })
);

goalRoute.post("/goals", (req, res) =>
  res.status(200).json({ msg: "Post goals API" })
);

goalRoute.delete("/goals/:id", (req, res) =>
  res.status(200).json({ msg: `Delete goals API ${req.params.id}` })
);

goalRoute.put("/goals/:id", (req, res) =>
  res.status(200).json({ msg: `Update goals API ${req.params.id}` })
);

module.exports = goalRoute;
