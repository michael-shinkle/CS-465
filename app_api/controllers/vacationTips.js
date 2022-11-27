const mongoose = require("mongoose"); //.set('debug', true)l
const Model = mongoose.model("vacationTips");

// GET: /vacationTips - lists all vacationTips
const vacationTipsList = async (req, res) => {
  Model.find({}, { _id: 0 }) // empty search filter to find all
    .exec((err, vacationTips) => {
      if (!vacationTips) {
        return res.status(404).json({ message: "vacationTips not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(vacationTips);
      }
    });
};

// GET: /vacationTips/:vacationTipCode - returns a single vacationTip
const vacationTipsFindCode = async (req, res) => {
  Model.find({ code: req.params.vacationTipCode }, { _id: 0 }) // searches for specific vacationTip
    .exec((err, vacationTip) => {
      if (!vacationTip) {
        return res.status(404).json({ message: "vacationTips not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(vacationTip);
      }
    });
};

module.exports = {
    vacationTipsList, vacationTipsFindCode
};