var fs = require('fs');
var blog = JSON.parse(fs.readFileSync('./data/blog.json', 'utf-8'));
var testimonial = JSON.parse(fs.readFileSync('./data/testimonials.json', 'utf-8'));
var page = JSON.parse(fs.readFileSync('./data/page.json', 'utf-8'));

/* GET Homepage */
const index = (req, res) => {
    res.render('index', { title: 'Travlr Getaways', blog, testimonial, page });
};

module.exports = {
    index
};