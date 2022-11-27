const request = require("request");
const apiOptions = {
  server: "http://localhost:3000",
};

// var fs = require('fs');
// var rooms = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf-8'));

/* GET Rooms view */
// const Rooms = (req, res) => {
//     res.render('Rooms', { title: 'Travlr Getaways', rooms });
// };

const renderRoomsList = (req, res, responseBody) => {
  let message = null;
  let pageTitle = process.env.npm_package_description + " - Rooms";
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No rooms exist in our database!";
    }
  }
  res.render("rooms", 
    { 
        title: pageTitle, 
        rooms: responseBody, 
        message 
    });
};

/* GET Rooms list view */
const roomsList = (req, res) => {
  const path = "/api/rooms";
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: "GET",
    json: {},
  };
  console.info(">> roomsController.roomsList calling " + requestOptions.url);
  request(requestOptions, (err, { statusCode }, body) => {
    if (err) {
      console.error(err);
    }
    renderRoomsList(req, res, body);
  });
};

module.exports = {
  roomsList
};
