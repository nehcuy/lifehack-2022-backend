const mongoose = require("mongoose");
const Laptop = require("./laptopModel");

const phoneSchema = new mongoose.Schema({
  laptop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Laptop",
  },
});

const Phone = mongoose.model("Phone", phoneSchema);

module.exports = Phone;
