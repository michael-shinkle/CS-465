const mongoose = require('mongoose');

// Define schema
const testimonialsSchema = new mongoose.Schema({
    code: {type: String, required: true, index: true},
    author: {type: String, required: true, index: true},
    link: {type: String, required: true},
    content: {type: String, required: true}
});

module.exports = mongoose.model('testimonials', testimonialsSchema);