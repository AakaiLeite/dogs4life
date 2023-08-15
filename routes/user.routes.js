//Requiring Packages
const express = require("express");
const router = express.Router();
const session = require("express-session");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

const Breed = require("../models/Breed.model");
const User = require("../models/User.model");

// GET Routes
router.get("/profile", isLoggedIn, (req, res) => {
  const currentUser = req.session.currentUser;
  res.render("user/profile", { currentUser });
});

router.get("/favorites", (req, res) => {
  const currentUser = req.session.currentUser;
  res.render("user/favorites", { currentUser });
});

module.exports = router;
