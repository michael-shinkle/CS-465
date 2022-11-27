const mongoose = require("mongoose"); //.set('debug', true)l
const Model = mongoose.model("blogs");

// GET: /blogs - lists all blogs
const blogsList = async (req, res) => {
  Model.find({}, { _id: 0 }) // empty search filter to find all
    .exec((err, blogs) => {
      if (!blogs) {
        return res.status(404).json({ message: "blogs not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(blogs);
      }
    });
};

// GET: /blogs/:blogCode - returns a single blog
const blogsFindCode = async (req, res) => {
  Model.find({ code: req.params.blogCode }, { _id: 0 }) // searches for specific blog
    .exec((err, blog) => {
      if (!blog) {
        return res.status(404).json({ message: "blogs not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(blog);
      }
    });
};

module.exports = {
  blogsList,
  blogsFindCode,
};
