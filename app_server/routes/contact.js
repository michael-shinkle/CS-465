const express = require('express');
const router = express.Router();
const controller= require('../controllers/contact');

/* GET home page. */
router.get('/contact', controller.contact);
module.exports = router