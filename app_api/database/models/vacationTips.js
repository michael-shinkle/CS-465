const mongoose = require('mongoose');

// Define schema
const vacationTipsSchema = new mongoose.Schema({
    code: {type: String, required: true, index: true},
    name: {type: String, required: true},
    link: {type: String, required: true},
});

module.exports = mongoose.model('vacationTips', vacationTipsSchema);