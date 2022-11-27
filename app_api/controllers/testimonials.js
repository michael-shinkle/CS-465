const mongoose = require("mongoose"); //.set('debug', true)l
const Model = mongoose.model("testimonials");

// GET: /testimonials - lists all testimonials
const testimonialsList = async (req, res) => {
  Model.find({}, { _id: 0 }) // empty search filter to find all
    .exec((err, testimonials) => {
      if (!testimonials) {
        return res.status(404).json({ message: "testimonials not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(testimonials);
      }
    });
};

// GET: /testimonials/:testimonialCode - returns a single testimonial
const testimonialsFindCode = async (req, res) => {
  Model.find({ code: req.params.testimonialCode }, { _id: 0 }) // searches for specific testimonial
    .exec((err, testimonial) => {
      if (!testimonial) {
        return res.status(404).json({ message: "testimonials not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(testimonial);
      }
    });
};

module.exports = {
    testimonialsList, testimonialsFindCode
};