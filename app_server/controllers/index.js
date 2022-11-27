const request = require("request");
const apiOptions = {
  server: "http://localhost:3000",
};


const renderIndexData = (req, res, blogData, testimonialData, pageData) => {
  let message = null;
  let pageTitle = process.env.npm_package_description + " - TRAVLR";
  if (!(blogData instanceof Array)) {
    message = "API lookup error";
    blogData = [];
  } else {
    if (!blogData.length) {
      message = "No blogs exist in our database!";
    }
  }
  if (!(testimonialData instanceof Array)) {
    message = "API lookup error";
    testimonialData = [];
  } else {
    if (!testimonialData.length) {
      message = "No testimonials exist in our database!";
    }
  }
  if (!(pageData instanceof Array)) {
    message = "API lookup error";
    articleData = [];
  } else {
    if (!pageData.length) {
      message = "No articles exist in our database!";
    }
  }
  res.render("index", {
    title: pageTitle,
    blogs: blogData,
    testimonials: testimonialData,
    pages: pageData,
    message,
  });
};

const indexView = (req, res) => {
  const blogsPath = "/api/blogs";
  const testimonialPath = "/api/testimonials";
  const pagePath = "/api/pages";

  const blogRequestOptions = {
    url: `${apiOptions.server}${blogsPath}`,
    method: "GET",
    json: {},
  };
  const testimonialRequestOptions = {
    url: `${apiOptions.server}${testimonialPath}`,
    method: "GET",
    json: {},
  };
  const pageRequestOptions = {
    url: `${apiOptions.server}${pagePath}`,
    method: "GET",
    json: {},
  };

  console.info(
    ">> indexController.indexView calling " + blogRequestOptions.url
  );
  request(blogRequestOptions, (err, { statusCode }, body) => {
    if (err) {
      console.error(err);
    }
    const blogData = body;

    // GET next mongoDB collection
    console.info(
      ">> indexController.indexView calling " + testimonialRequestOptions.url
    );
    request(testimonialRequestOptions, (err, { statusCode }, body) => {
      if (err) {
        console.error(err);
      }
      const testimonialData = body;

      // GET next mongoDB collection
      console.info(
        ">> indexController.indexView calling " + pageRequestOptions.url
      );
      request(pageRequestOptions, (err, { statusCode }, body) => {
        if (err) {
          console.error(err);
        }
        const pageData = body;
        renderIndexData(req, res, blogData, testimonialData, pageData);
      });
    });
  });
};

module.exports = {
  indexView,
};
