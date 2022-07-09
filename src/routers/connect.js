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

router.get("/newPhone/:code", async (req, res) => {
  try {
    const laptop = await Laptop.findOne({
      code: req.params.code,
    });
    if (laptop == null) {
      throw new Error("Invalid code");
    }
    const phone = new Phone({ laptop: laptop._id });
    laptop.phone = phone._id;
    console.log(phone);
    await laptop.save();
    await phone.save();
    res.status(201).send({ phone });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
