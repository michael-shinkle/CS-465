const express = require('express');
const router = express.Router();
const controller= require('../controllers/news');

/* GET home page. */
router.get('/news', controller.news);
module.exports = router