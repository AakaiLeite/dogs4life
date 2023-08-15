const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser;
    res.render("index", { currentUser });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
