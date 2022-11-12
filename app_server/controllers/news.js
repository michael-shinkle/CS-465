var fs = require('fs');
var latestNews = JSON.parse(fs.readFileSync('./data/latestNews.json', 'utf-8'));
var vacationTips = JSON.parse(fs.readFileSync('./data/vacationTips.json', 'utf-8'));
var article = JSON.parse(fs.readFileSync('./data/article.json', 'utf-8'));

/* GET news view */
const news = (req, res) => {
    res.render('news', { title: 'Travlr Getaways', latestNews, vacationTips, article });
};

module.exports = {
    news
}