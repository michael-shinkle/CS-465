const mongoose = require('mongoose');

// Define schema
const blogsSchema = new mongoose.Schema({
    code: {type: String, required: true, index: true},
    title: {type: String, required: true, index: true},
    link: {type: String, required: true},
    date: {type: String, required: true},
    content: {type: String, required: true}
});

module.exports = mongoose.model('blogs', blogsSchema);