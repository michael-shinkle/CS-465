const express = require("express");
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["HS256"],
});

// Import controller files
const articlesController = require("../controllers/articles");
const authController = require("../controllers/authentication");
const blogsController = require("../controllers/blogs");
const latestNewsController = require("../controllers/latestNews");
const mealsController = require("../controllers/meals");
const pagesController = require("../controllers/pages");
const roomsController = require("../controllers/rooms");
const testimonialsController = require("../controllers/testimonials");
const tripsController = require("../controllers/trips");
const vacationTipsController = require("../controllers/vacationTips");

// set up routes for controllers
router.route("/login").post(authController.login);
router.route("/register").post(authController.register);

router.route("/articles").get(articlesController.articlesList);
router.route("/articles/:articleCode").get(articlesController.articlesFindCode);

router.route("/blogs").get(blogsController.blogsList);
router.route("/blogs/:blogCode").get(blogsController.blogsFindCode);

router.route("/latestNews").get(latestNewsController.latestNewsList);
router
  .route("/latestNews/:latestNewsCode")
  .get(latestNewsController.latestNewsFindCode);

router.route("/meals").get(mealsController.mealsList);
router.route("/meals/:mealCode").get(mealsController.mealsFindCode);

router.route("/pages").get(pagesController.pagesList);
router.route("/pages/:pageCode").get(pagesController.pagesList);

router
  .route("/rooms")
  .get(roomsController.roomsList)
  .post(auth, roomsController.roomsAddRoom);
router
  .route("/rooms/:roomCode")
  .get(roomsController.roomsFindCode)
  .put(auth, roomsController.roomsUpdateRoom)
  .delete(auth, roomsController.roomsDeleteRoom);

router.route("/testimonials").get(testimonialsController.testimonialsList);
router
  .route("/testimonials/:testimonialCode")
  .get(testimonialsController.testimonialsFindCode);

router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(auth, tripsController.tripsAddTrip);
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindCode)
  .put(auth, tripsController.tripsUpdateTrip)
  .delete(auth, tripsController.tripsDeleteTrip);

router.route("/vacationTips").get(vacationTipsController.vacationTipsList);
router
  .route("/vacationTips/:vacationTipCode")
  .get(vacationTipsController.vacationTipsFindCode);

module.exports = router;
