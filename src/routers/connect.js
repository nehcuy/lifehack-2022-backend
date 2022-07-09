const express = require("express");
const Phone = require("../models/phoneModel");
const Laptop = require("../models/laptopModel");

const router = new express.Router();

router.post("/newLaptop", async (req, res) => {
  const laptop = new Laptop(req.body);
  try {
    await laptop.save();
    res.status(201).send({ laptop });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
