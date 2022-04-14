const express = require("express");
const {
  getGoals,
  deleteGoal,
  updateGoal,
  postGoal,
} = require("../controllers/goalController");

const goalRoute = express.Router();

goalRoute.get("/goals", getGoals);

goalRoute.post("/goals", postGoal);

goalRoute.delete("/goals/:id", deleteGoal);

goalRoute.put("/goals/:id", updateGoal);

module.exports = goalRoute;
