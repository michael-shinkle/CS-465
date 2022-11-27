const mongoose = require('mongoose');

// Define schema
const latestNewsSchema = new mongoose.Schema({
    code: {type: String, required: true, index: true},
    name: {type: String, required: true, index: true},
    link: {type: String, required: true}
});

module.exports = mongoose.model('latestNews', latestNewsSchema);