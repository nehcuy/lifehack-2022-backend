const mongoose = require("mongoose");
const Phone = require("./phoneModel");

const laptopSchema = new mongoose.Schema({
  code: {
    type: Number,
    minLength: 4,
    maxLength: 4,
    unique: true,
  },
  phone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Phone",
    default: null,
  },
  locked: {
    type: Boolean,
    default: false,
  },
  moved: {
    type: Boolean,
    default: false,
  },
});

const Laptop = mongoose.model("Laptop", laptopSchema);

module.exports = Laptop;
