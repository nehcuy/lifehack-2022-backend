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
    await laptop.save();
    await phone.save();
    res.status(201).send({ phone });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.patch("/updateLaptop", async (req, res) => {
  try {
    const laptop = await Laptop.findOne({
      _id: req.body.laptop._id,
    });

    // Either change in locked status or change in moved status
    if (req.body.laptop.moved != null) {
      laptop.moved = req.body.laptop.moved;
    } else {
      laptop.locked = req.body.laptop.locked;
    }
    await laptop.save();
    res.send(laptop);
  } catch (e) {
    res.status(400).send({ error: "Update failed" });
  }
});

router.get("/moveStatus/:phoneID", async (req, res) => {
  try {
    const phone = await Phone.findOne({
      _id: req.params.phoneID,
    });
    if (phone == null) {
      throw new Error("Invalid phone");
    }

    const laptop = await Laptop.findOne({
      _id: phone.laptop._id,
    });
    res.send(laptop.moved);
  } catch (e) {
    res.status(400).send({ error: "An error occured" });
  }
});

module.exports = router;
