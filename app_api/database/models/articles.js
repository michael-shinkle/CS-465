const mongoose = require('mongoose');

// Define schema
const articlesSchema = new mongoose.Schema({
    code: {type: String, required: true, index: true},
    title: {type: String, required: true, index: true},
    image: {type: String, required: true},
    date: {type: String, required: true},
    author: {type: String, required: true},
    content: {type: String, required: true}
});

module.exports = mongoose.model('articles', articlesSchema);