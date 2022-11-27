const request = require("request");
const apiOptions = {
  server: "http://localhost:3000",
};

// var fs = require('fs');
// var meal = JSON.parse(fs.readFileSync('./data/meal.json', 'utf-8'));

// /* GET meals view */
// const meals = (req, res) => {
//     res.render('meals', { title: 'Travlr Getaways', meal });
// };

const renderMealsList = (req, res, responseBody) => {
  let message = null;
  let pageTitle = process.env.npm_package_description + " - Meals";
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No meals exist in our database!";
    }
  }
  res.render("meals", {
    title: pageTitle,
    meals: responseBody,
    message,
  });
};

/* GET Meals list view */
const MealsList = (req, res) => {
  const path = "/api/meals";
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: "GET",
    json: {},
  };
  console.info(">> mealsController.mealsList calling " + requestOptions.url);
  request(requestOptions, (err, { statusCode }, body) => {
    if (err) {
      console.error(err);
    }
    renderMealsList(req, res, body);
  });
};

module.exports = {
  MealsList
};
