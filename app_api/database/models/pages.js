const mongoose = require('mongoose');

// Define schema
const pagesSchema = new mongoose.Schema({
    code: {type: String, required: true, index: true},
    image: {type: String, required: true},
    link: {type: String, required: true},
});

module.exports = mongoose.model('pages', pagesSchema);