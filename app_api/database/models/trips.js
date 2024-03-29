const mongoose = require('mongoose');

// Define schema
const tripSchema = new mongoose.Schema({
    code: {type: String, required: true, index: true},
    name: {type: String, required: true, index: true},
    link: {type: String, required: true},
    length: {type: String, required: true},
    start: {type: String, required: true},
    resort: {type: String, required: true},
    perPerson: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model('trips', tripSchema);