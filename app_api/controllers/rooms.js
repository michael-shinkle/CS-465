const mongoose = require("mongoose"); //.set('debug', true)l
const Model = mongoose.model("rooms");

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

module.exports = {
    roomsList, roomsFindCode
};