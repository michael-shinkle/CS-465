const mongoose = require("mongoose"); //.set('debug', true)l
const Model = mongoose.model("rooms");
const User = mongoose.model("users");

const getUser = (req, res, callback) => {
  if (req.auth && req.auth.email) {
    User.findOne({ email: req.auth.email }).exec((err, user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else if (err) {
        console.log(err);
        return res.status(404).json(err);
      }
      callback(req, res, user.name);
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

// GET: /rooms - lists all rooms
const roomsList = async (req, res) => {
  Model.find({}, { _id: 0 }) // empty search filter to find all
    .exec((err, rooms) => {
      if (!rooms) {
        return res.status(404).json({ message: "rooms not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(rooms);
      }
    });
};

// GET: /rooms/:roomCode - returns a single room
const roomsFindCode = async (req, res) => {
  Model.find({ code: req.params.roomCode }, { _id: 0 }) // searches for specific room
    .exec((err, room) => {
      if (!room) {
        return res.status(404).json({ message: "rooms not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(room);
      }
    });
};

const roomsAddRoom = async (req, res) => {
  getUser(req, res, (req, res) => {
    Model.create(
      {
        code: req.body.code,
        name: req.body.name,
        link: req.body.link,
        image: req.body.image,
        description: req.body.description,
        rate: req.body.rate,
      },
      (err, room) => {
        if (err) {
          return res.status(400).json(err);
        } else {
          return res.status(201).json(room);
        }
      }
    );
  });
};

const roomsUpdateRoom = async (req, res) => {
  getUser(req, res, (req, res) => {
    Model.findOneAndUpdate(
      { code: req.params.roomCode },
      {
        code: req.body.code,
        name: req.body.name,
        link: req.body.link,
        image: req.body.image,
        description: req.body.description,
        rate: req.body.rate,
      },
      { new: true }
    )
      .then((room) => {
        if (!room) {
          return res.status(404).send({
            message: "Room not found with code " + req.params.roomCode,
          });
        }
        res.send(room);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).sent({
            message: "Room not found with code " + req.params.roomCode,
          });
        }
        return res.status(500).json(err);
      });
  });
};

const roomsDeleteRoom = async (req, res) => {
  Model.deleteOne({ code: req.params.roomCode }, (err) => {
    if (err) console.log(err);
    else return res.status(201).json();
  });
};

module.exports = {
  roomsList,
  roomsFindCode,
  roomsAddRoom,
  roomsUpdateRoom,
  roomsDeleteRoom
};
