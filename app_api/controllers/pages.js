const mongoose = require("mongoose"); //.set('debug', true)l
const Model = mongoose.model("pages");

// GET: /pages - lists all pages
const pagesList = async (req, res) => {
  Model.find({}, { _id: 0 }) // empty search filter to find all
    .exec((err, pages) => {
      if (!pages) {
        return res.status(404).json({ message: "pages not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(pages);
      }
    });
};

// GET: /pages/:pageCode - returns a single page
const pagesFindCode = async (req, res) => {
  Model.find({ code: req.params.pageCode }, { _id: 0 }) // searches for specific page
    .exec((err, page) => {
      if (!page) {
        return res.status(404).json({ message: "pages not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(page);
      }
    });
};

module.exports = {
    pagesList, pagesFindCode
};