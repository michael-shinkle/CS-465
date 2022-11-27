const request = require("request");
const apiOptions = {
  server: "http://localhost:3000",
};

const renderNewsData = (req, res, latestNewsData, vacationTipsData, articleData) => {
    let message = null;
  let pageTitle = process.env.npm_package_description + " - Latest News";
  if (!(latestNewsData instanceof Array)) {
    message = "API lookup error";
    latestNewsData = [];
  } else {
    if (!latestNewsData.length) {
      message = "No latest news exist in our database!";
    }
  }
  if (!(vacationTipsData instanceof Array)) {
    message = "API lookup error";
    vacationTipsData = [];
  } else {
    if (!vacationTipsData.length) {
      message = "No vacation tips exist in our database!";
    }
  }
  if (!(articleData instanceof Array)) {
    message = "API lookup error";
    articleData = [];
  } else {
    if (!articleData.length) {
      message = "No articles exist in our database!";
    }
  }
  res.render("news", {
    title: pageTitle,
    latestNews: latestNewsData,
    vacationTips: vacationTipsData,
    articles: articleData,
    message,
  });
}

const newsView = (req, res) => {
  const newsPath = "/api/latestNews";
  const vacationTipsPath = "/api/vacationTips";
  const articlePath = "/api/articles";

  const newsRequestOptions = {
    url: `${apiOptions.server}${newsPath}`,
    method: "GET",
    json: {},
  };
  const vacationRequestOptions = {
    url: `${apiOptions.server}${vacationTipsPath}`,
    method: "GET",
    json: {},
  };
  const articleRequestOptions = {
    url: `${apiOptions.server}${articlePath}`,
    method: "GET",
    json: {},
  };

  // GET data from mongoDB collections and pass data to renderNewsData function
  console.info(">> newsController.newsView calling " + newsRequestOptions.url);
  request(newsRequestOptions, (err, { statusCode }, body) => {
    if (err) {
      console.error(err);
    }
    const latestNewsData = body;

    // GET next mongoDB collection
    console.info(">> newsController.newsView calling " + vacationRequestOptions.url);
    request(vacationRequestOptions, (err, { statusCode }, body) => {
      if (err) {
        console.error(err);
      }
      const vacationTipsData = body;

      // GET next mongoDB collection
      console.info(">> newsController.newsView calling " + articleRequestOptions.url);
      request(articleRequestOptions, (err, { statusCode }, body) => {
        if (err) {
          console.error(err);
        }
        const articleData = body;
        renderNewsData(req, res, latestNewsData, vacationTipsData, articleData);
      });
    });
  });
};

module.exports = {
  newsView,
};
