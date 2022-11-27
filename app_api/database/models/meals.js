const mongoose = require('mongoose');

// Define schema
const mealsSchema = new mongoose.Schema({
    code: {type: String, required: true, index: true},
    name: {type: String, required: true, index: true},
    link: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model('meals', mealsSchema);