const mongoose = require("mongoose"); //.set('debug', true)l
const Model = mongoose.model("latestNews");

// GET: /latestNews - lists all latestNews
const latestNewsList = async (req, res) => {
  Model.find({}, { _id: 0 }) // empty search filter to find all
    .exec((err, latestNews) => {
      if (!latestNews) {
        return res.status(404).json({ message: "latestNews not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(latestNews);
      }
    });
};

// GET: /latestNews/:latestNewsCode - returns a single latestNews
const latestNewsFindCode = async (req, res) => {
  Model.find({ code: req.params.latestNewsCode }, { _id: 0 }) // searches for specific latestNews
    .exec((err, latestNews) => {
      if (!latestNews) {
        return res.status(404).json({ message: "latestNews not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(latestNews);
      }
    });
};

module.exports = {
    latestNewsList, latestNewsFindCode
};