const Goal = require("../model/goalModel");

const getGoals = async (req, res) => {
  let goals = await Goal.find({});
  res.status(200).json(goals);
};

const postGoal = async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ msg: "Error with not input text" });
  }
  await Goal.create({ text: req.body.text });
  res.status(200).json({ text: req.body.text });
};

const deleteGoal = async (req, res) => {
  let goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(200).json({ msg: "Not found this object" });
  }

  let goalAfterDelete = await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json(goalAfterDelete);
};

const updateGoal = async (req, res) => {
  let goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(200).json({ msg: "Not found this object" });
  }
  let goalUpate = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(goalUpate);
};

module.exports = { getGoals, deleteGoal, updateGoal, postGoal };
