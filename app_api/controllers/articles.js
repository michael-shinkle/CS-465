const mongoose = require("mongoose"); //.set('debug', true)l
const Model = mongoose.model("articles");

// GET: /articles - lists all articles
const articlesList = async (req, res) => {
  Model.find({}, { _id: 0 }) // empty search filter to find all
    .exec((err, articles) => {
      if (!articles) {
        return res.status(404).json({ message: "articles not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(articles);
      }
    });
};

// GET: /articles/:articleCode - returns a single article
const articlesFindCode = async (req, res) => {
  Model.find({ code: req.params.articleCode }, { _id: 0 }) // searches for specific article
    .exec((err, article) => {
      if (!article) {
        return res.status(404).json({ message: "articles not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(article);
      }
    });
};

module.exports = {
  articlesList,
  articlesFindCode,
};
