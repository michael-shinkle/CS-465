const mongoose = require("mongoose"); //.set('debug', true)l
const Model = mongoose.model("meals");

// GET: /meals - lists all meals
const mealsList = async (req, res) => {
  Model.find({}, { _id: 0 }) // empty search filter to find all
    .exec((err, meals) => {
      if (!meals) {
        return res.status(404).json({ message: "meals not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(meals);
      }
    });
};

// GET: /meals/:mealCode - returns a single meal
const mealsFindCode = async (req, res) => {
  Model.find({ code: req.params.mealCode }, { _id: 0 }) // searches for specific meal
    .exec((err, meal) => {
      if (!meal) {
        return res.status(404).json({ message: "meals not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(meal);
      }
    });
};

module.exports = {
    mealsList, mealsFindCode
};